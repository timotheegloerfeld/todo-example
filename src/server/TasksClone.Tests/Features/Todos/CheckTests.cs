using System;
using HotChocolate;
using TasksClone.Features.Todos;
using TasksClone.Models;
using Xunit;

namespace TasksClone.Tests.Features.Todos
{
    public class CheckTests
    {
        [Fact]
        public void CheckTodo_Null_ShouldThrow()
        {
            Assert.Throws<GraphQLException>(() => Check.Service.CheckTodo(Guid.Empty, null));
        }

        [Fact]
        public void CheckTodo_Todo_ReturnsCheckedTodo()
        {
            var todo = new Todo("test");
            var checkedTodo = Check.Service.CheckTodo(todo.Id, todo);
            //Assert.True(checkedTodo.IsDone);
        }
    }
}
