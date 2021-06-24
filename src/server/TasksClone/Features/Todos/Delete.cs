using System;
using System.Linq;
using System.Threading.Tasks;
using Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using Microsoft.EntityFrameworkCore;
using TasksClone.Infrastructure;
using TasksClone.Models;

namespace TasksClone.Features.Todos
{
    public class Delete
    {
        [ExtendObjectType("Mutation")]
        public class Mutation
        {
            [UseDbContext(typeof(AppDbContext))]
            public async Task<Todo> DeleteTodo(
            Guid id,
            [ScopedService] AppDbContext dbContext)
            {

                var todoResult = dbContext.Todos
                        .AsNoTracking()
                        .FirstOrDefault(t => t.Id == id);

                if (todoResult is Todo todo)
                {
                    dbContext.Todos.Remove(todo);
                    await dbContext.SaveChangesAsync();

                    return todo;
                }
                else
                {
                    throw Errors.GetException(new Errors.TodoNotFound(id));
                }
            }
        }

    }
}