using System.Linq;
using Data;
using HotChocolate;
using HotChocolate.Data;
using TasksClone.Models;

namespace TasksClone.Features.Todos
{
    public class List
    {
        [UseDbContext(typeof(AppDbContext))]
        public IQueryable<Todo> GetTodos(
            [ScopedService] AppDbContext dbContext)
        => dbContext.Todos.OrderBy(t => t.IsDone).ThenBy(t => t.Id);
    }
}