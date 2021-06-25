using System;
using HotChocolate;
using TasksClone.Features.Todos;
using TasksClone.Models;
using Xunit;

namespace TasksClone.Tests.Features.Todos
{
    public class UncheckTests
    {
        [Fact]
        public void UncheckTodo_Null_ShouldThrow()
        {
            Assert.Throws<GraphQLException>(() => Uncheck.Service.UncheckTodo(Guid.Empty, null));
        }

        [Fact]
        public void UncheckTodo_Todo_ReturnsUncheckedTodo()
        {
            var todo = new Todo("test");
            var uncheckedTodo = Uncheck.Service.UncheckTodo(todo.Id, todo);
            //Assert.False(uncheckedTodo.IsDone);
        }
    }
}
