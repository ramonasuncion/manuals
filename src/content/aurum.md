# Aurum Programming Language

Aurum is an untyped, interpreted, stack-oriented programming language that's focused on simplicity and minimalism.

## Why?

I wanted to learn how to create a programming language from scratch. I was going to go all in and create a compiled, general-purpose, statically typed programming language, but I decided to start small and work my way up. I read on [reddit](https://www.reddit.com/r/ProgrammingLanguages/comments/4jtwf8/comment/d39l2rm/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button) that creating a stack-oriented language is a good place to start, so I did.

## Language Specification

The syntax of Aurum is inspired by [Porth](https://gitlab.com/tsoding/porth).

### Stack manipulation

```text
dup   ( a -- a a )
2dup  ( a b -- a b a b )
drop  ( a -- )
2drop ( a b -- )
swap  ( a b -- b a )
2swap ( a b c d -- c d a b )
over  ( a b -- a b a )
2over ( a b c d -- a b c d a b )
rot   ( a b c -- b c a )
peek  ( a -- a )
```

### Arithmetic operators

```text
a b + ( -- a+b )
a b - ( -- a-b )
a b * ( -- a*b )
```

### Bitwise operators

```text
a b &  ( -- a and b )
a b |  ( -- a or b )
a ~    ( -- not a )
a b ^  ( -- a xor b )
```

### Relational operators

```text
a b =  ( -- a == b )
a b != ( -- a != b )
a b <  ( -- a < b )
a b >  ( -- a > b )
a b <= ( -- a <= b )
a b >= ( -- a >= b )
```

### While Loop

```text
<starting-value>
while <condition> do
  <op>
end
```

### If Statement

```text
if <condition> then
  <statement>
else
  <statement>
end
```

### Include directive

```text
include <file.ah>
include "file.ah"
```

### Comments

```text
//  This is a comment
/*
  This is also a comment.
*/
```

## Strings and Characters

```text
"Hello, world!" // string
'a' // character
```

## Macros

```text
def <name> <value> end
```

## Possible future changes

### Constants

```text
final <name> <value> end
```

### Types (Dynamic Typing)

```text
int    ( -- int ) 64 bit signed integer
bool   ( -- bool ) 8 bit boolean
string ( -- string ) 8 bit character string
```

### Math Library (math.ah)

```text
pow ( a b -- a^b )
avg ( a b -- (a+b)/2 )
min ( a b -- min(a,b) )
max ( a b -- max(a,b) )
```

### Elif

```text
elseif <condition> then
  <statement>
```

### Procedures

No return values.

```text
procedure <name> ( <args> ) is
  <statements>
end

<name> ( <args> )
```

# Reference

1. [CSCI 308 Programming Language Design at Bucknell University](https://coursecatalog.bucknell.edu/search/?P=CSCI%20308) The course that sparked my interest in programming languages.

2. [How I wrote a Lexer by Chirag Khandelwal](https://medium.com/young-coder/how-i-wrote-a-lexer-39f4f79d2980) I was interested in the lexcial output of the lexer.

3. [Crafting Interpreters by Bob Nystrom](https://craftinginterpreters.com/). The book has great information on how to write a lexer.

4. [Stack-oriented programming language](https://en.wikipedia.org/wiki/Stack-oriented_programming_language). I was reading on a couple of forums and found that stack-oriented languages are easier to implement.

5. [Direct Operating System Access via Syscalls](https://www.cs.uaf.edu/2017/fall/cs301/lecture/11_17_syscall.html) Some programming languages have the ability to access the operating system directly. I wanted to implement this feature in my language.

6. [Finite-state Machine](https://en.wikipedia.org/wiki/Finite-state_machine) x10 the speed of the interpreter instead of using a switch statement.

7. [Shifting Bits](http://lars.nocrew.org/forth2012/core/RSHIFT.html) How to shift bits in a number.

8. [Linux System Call Table](https://chromium.googlesource.com/chromiumos/docs/+/master/constants/syscalls.md) The syscall numbers.

9. [While loop](https://stackoverflow.com/questions/6949434/how-to-implement-loop-in-a-forth-like-language-interpreter-written-in-c) How to implement a while loop for my interpreter.

10. [Forth Keywords](http://lars.nocrew.org/forth2012/core.html) The keywords in Forth.

11. [Forth Stack Operations](https://www.forth.com/starting-forth/2-stack-manipulation-operators-arithmetic/) Using the stack operations from Forth.

12. [Tsoding Daily](https://www.youtube.com/@TsodingDaily) Tsoding has a great series on making his own concatenative programming language.

13. [Jump Table](https://en.wikipedia.org/wiki/Branch_table) to implement my interpreter. I was going to use a switch statement but I found that a jump table is faster and more efficient. The interpreter is 40,000 times faster.
