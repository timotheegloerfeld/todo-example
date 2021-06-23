using System;

namespace TasksClone.Models
{
    public record Todo(
        string Text,
        Boolean IsDone = false
    )
    {
        public Guid Id { get; init; }
    }
}
