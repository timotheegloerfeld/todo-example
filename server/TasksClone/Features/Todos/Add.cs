using System.Threading.Tasks;
using Data;
using HotChocolate;
using HotChocolate.Data;
using HotChocolate.Types;
using TasksClone.Models;

namespace TasksClone.Features.Todos
{
    public class Add
    {
        [ExtendObjectType("Mutation")]
        public class Mutation
        {
            [UseDbContext(typeof(AppDbContext))]
            public async Task<Todo> AddTodo(
            string text,
            [ScopedService] AppDbContext dbContext)
            {
                var todo = new Todo(text);

                dbContext.Add(todo);
                await dbContext.SaveChangesAsync();

                return todo;
            }
        }

    }
}