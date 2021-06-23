using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TasksClone.Models;
using TasksClone.Infrastructure;
using OneOf;

namespace TasksClone.Features.Todos
{
    public class Check
    {
        public static class Service
        {
            public static OneOf<Todo, Errors.TodoNotFound> CheckTodo(Guid id, Todo? todoResult)
            {
                if (todoResult is Todo todo)
                {
                    return todo with { IsDone = true };
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
            public async Task<Todo> CheckTodo(
                Guid id,
                [ScopedService] AppDbContext dbContext)
            {
                var todoResult = dbContext.Todos
                    .AsNoTracking()
                    .FirstOrDefault(t => t.Id == id);

                var checkedTodo = Service.CheckTodo(id, todoResult)
                    .Match(
                        todo => todo,
                        notFound => throw Errors.GetException(notFound)
                    );

                dbContext.Update(checkedTodo);
                await dbContext.SaveChangesAsync();

                return checkedTodo;
            }
        }
    }
}