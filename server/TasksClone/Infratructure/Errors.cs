using System;
using HotChocolate;

namespace TasksClone.Infrastructure
{
    public interface ApplicationError
    {
        public string message { get; }
    }

    public class Errors
    {
        public record TodoNotFound(Guid id) : ApplicationError
        {
            public string message => $"Todo with ID {id} could not be found";
        }

        public static Exception GetException(ApplicationError error)
        {
            var gqlError = ErrorBuilder
                .New()
                .SetMessage(error.message)
                .Build();

            return new GraphQLException(gqlError);
        }
    }
}