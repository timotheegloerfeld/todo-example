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
    public class Rename
    {
        public static class Service
        {
            public static OneOf<Todo, Errors.TodoNotFound> RenameTodo(Guid id, string text, Todo? todoResult)
            {
                if (todoResult is Todo todo)
                {
                    return todo with { Text = text };
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
            public async Task<Todo> RenameTodo(
                Guid id,
                string text,
                [ScopedService] AppDbContext dbContext)
            {
                var todoResult = await dbContext.Todos
                    .AsNoTracking()
                    .FirstOrDefaultAsync(t => t.Id == id);

                var renamedTodo = Service.RenameTodo(id, text, todoResult)
                    .Match(
                        todo => todo,
                        notFound => throw Errors.GetException(notFound)
                    );

                dbContext.Update(renamedTodo);
                dbContext.SaveChanges();

                return renamedTodo;
            }
        }
    }
}