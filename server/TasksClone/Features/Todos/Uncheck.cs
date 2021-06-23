using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using OneOf;
using TasksClone.Infrastructure;
using TasksClone.Models;

namespace TasksClone.Features.Todos
{
    public class Uncheck
    {
        public static class Service
        {
            public static OneOf<Todo, Errors.TodoNotFound> UncheckTodo(Guid id, Todo? todoResult)
            {
                if (todoResult is Todo todo)
                {
                    return todo with { IsDone = false };
                }
                else
                {
                    return new Errors.TodoNotFound(id);
                }
            }
        }

        [ExtendObjectType("Mutation")]
        public class Mutation
        {
            [UseDbContext(typeof(AppDbContext))]
            public async Task<Todo> UncheckTodo(
                Guid id,
                [ScopedService] AppDbContext dbContext)
            {
                var todoResult = dbContext.Todos
                    .AsNoTracking()
                    .FirstOrDefault(t => t.Id == id);

                var uncheckedTodo = Service.UncheckTodo(id, todoResult)
                    .Match(
                        todo => todo,
                        notFound => throw Errors.GetException(notFound)
                    );

                dbContext.Update(uncheckedTodo);
                await dbContext.SaveChangesAsync();

                return uncheckedTodo;
            }
        }
    }

}