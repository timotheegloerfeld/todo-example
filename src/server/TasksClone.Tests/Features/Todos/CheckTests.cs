using System;
using Xunit;
using TasksClone.Features.Todos;
using TasksClone.Models;
using HotChocolate;

namespace TasksClone.Tests.Features.Todos
{
    public class CheckTests
    {
        [Fact]
        public void CheckTodo_Null_ShouldThrow()
        {
            Assert.Throws<GraphQLException>(() => Check.Service.CheckTodo(null));
        }

        [Fact]
        public void CheckTodo_Todo_ReturnsCheckedTodo()
        {
            var todo = new Todo("test");
            var checkedTodo = Check.Service.CheckTodo(todo);
            Assert.True(checkedTodo.IsDone);
        }
    }
}
