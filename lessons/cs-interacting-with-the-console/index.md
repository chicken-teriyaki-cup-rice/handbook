---
title: Interacting with the Console
assignments:
  - cs-variables
---

When writing applications that interact with a user the simplest method is using
a `console` application. In these applications, we can output information to the
user and read `string`s of information from the user. All completed in the same
console used to launch our application.

## What would this look like?

Here is an example of the input and output of the code we are going to write:

![interacting](./assets/interacting.gif)

## Sending information to the console

All of the code we are going to use begins with `Console` and as the name
suggests this is the part of `C#` that allows us to interact with the user.

Let's start with outputting a message to our user:

```csharp
Console.WriteLine("Welcome to my program");
```

This writes a line of output to the console and returns the cursor to the
beginning of the **next** line.

We can also include blank lines by using the special sequence `\n` which
represents a blank line of its own.

The following will output **two** blank lines, one for the `WriteLine` and one
because we included a `\n`

```csharp
Console.WriteLine("\n");
```

The next method to discuss is a modification of `Console.WriteLine`. If we want
to output some text but leave the cursor on the current line we can use `Write`
instead of `WriteLine`. `Write` works the same way but does not move the cursor
to the next line.

```csharp
Console.Write("What is your name? ");
```

This code will print the prompt, the `?`, and a blank space, leaving the cursor
on the same line. This is a good experience for the user since it places the
cursor on the same line.

## Reading information from the console

Next we want to read information from the console. To read information we use
`Console.ReadLine`. This will return a `string` which we can put into a
variable.

```csharp
var name = Console.ReadLine();
```

This will read a line of input (which the user ends by pressing return) and
place the resulting string into the variable `name`.

Finally we print out the greeting with:

```csharp
Console.WriteLine($"It is a pleasure to meet you, {name}");
```

## Full program

```csharp
using System;

namespace OurDotNetApp
{
  class Program
  {
    static void Main(string[] args)
    {
      Console.WriteLine("Welcome to my program");
      Console.WriteLine("\n");

      Console.Write("What is your name? ");
      var name = Console.ReadLine();

      Console.WriteLine($"It is a pleasure to meet you, {name}");
    }
  }
}
```
