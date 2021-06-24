using System;
using Xunit;
using TasksClone.Features.Todos;
using TasksClone.Models;
using HotChocolate;

namespace TasksClone.Tests.Features.Todos
{
    public class UncheckTests
    {
        [Fact]
        public void UncheckTodo_Null_ShouldThrow()
        {
            Assert.Throws<GraphQLException>(() => Uncheck.Service.UncheckTodo(null));
        }

        [Fact]
        public void UncheckTodo_Todo_ReturnsUncheckedTodo()
        {
            var todo = new Todo("test");
            var uncheckedTodo = Uncheck.Service.UncheckTodo(todo);
            Assert.False(uncheckedTodo.IsDone);
        }
    }
}
