![logo](/asset/bash/bash.png)

# History

Brian Fox began coding Bash on January 10, 1988[19] after Richard Stallman became dissatisfied with the lack of progress being made by a prior developer.[7] Stallman and the Free Software Foundation (FSF) considered a free shell that could run existing shell scripts so strategic to a completely free system built from BSD and GNU code that this was one of the few projects they funded themselves, with Fox undertaking the work as an employee of FSF.[7][20] Fox released Bash as a beta, version .99, on June 8, 1989[9] and remained the primary maintainer until sometime between mid-1992[21] and mid-1994,[22] when he was laid off from FSF[23] and his responsibility was transitioned to another early contributor, Chet Ramey.[24][25][26]

Since then, Bash has become by far the most popular shell among users of Linux, becoming the default interactive shell on that operating system's various distributions (although Almquist shell may be the default scripting shell) and on Apple's macOS.[27][28][29] Bash has also been ported to Microsoft Windows and distributed with Cygwin and MinGW, to DOS by the DJGPP project, to Novell NetWare and to Android via various terminal emulation applications.

In September 2014, Stéphane Chazelas, a Unix/Linux specialist,[30] discovered a security bug in the program. The bug, first disclosed on September 24, was named Shellshock and assigned the numbers CVE-2014-6271, CVE-2014-6277[31] and CVE-2014-7169. The bug was regarded as severe, since CGI scripts using Bash could be vulnerable, enabling arbitrary code execution. The bug was related to how Bash passes function definitions to subshells through environment variables.[32]

# Features

The Bash command syntax is a superset of the Bourne shell command syntax. Bash support brace expansion, command line completion and exception handling (using trap) among others features. Bash can execute the vast majority of Bourne shell scripts without modification, with the exception of Bourne shell scripts stumbling into fringe syntax behavior interpreted differently in Bash or attempting to run a system command matching a newer Bash builtin, etc. Bash command syntax includes ideas drawn from the Korn shell (ksh) and the C shell (csh) such as command line editing, command history, the directory stack, the $RANDOM and $PPID variables, and POSIX command substitution syntax $(…).

When a user presses the tab key within an interactive command-shell, Bash automatically uses command line completion, since beta version of 2.04[33], to match partly typed program names, filenames and variable names. The Bash command-line completion system is very flexible and customizable, and is often packaged with functions that complete arguments and filenames for specific programs and tasks.

Bash's syntax has many extensions lacking in the Bourne shell. Bash can perform integer calculations ("arithmetic evaluation") without spawning external processes. It uses the ((…)) command and the $((…)) variable syntax for this purpose. Its syntax simplifies I/O redirection. For example, it can redirect standard output (stdout) and standard error (stderr) at the same time using the &> operator. This is simpler to type than the Bourne shell equivalent 'command > file 2>&1'. Bash supports process substitution using the <(command) and >(command)syntax, which substitutes the output of (or input to) a command where a filename is normally used. (This is implemented through /proc/fd/ unnamed pipes on systems that support that, or via temporary named pipes where necessary).

When using the 'function' keyword, Bash function declarations are not compatible with Bourne/Korn/POSIX scripts (the Korn shell has the same problem when using 'function'), but Bash accepts the same function declaration syntax as the Bourne and Korn shells, and is POSIX-conformant. Because of these and other differences, Bash shell scripts are rarely runnable under the Bourne or Korn shell interpreters unless deliberately written with that compatibility in mind, which is becoming less common as Linux becomes more widespread. But in POSIX mode, Bash conforms with POSIX more closely.[34]

Bash supports here documents. Since version 2.05b Bash can redirect standard input (stdin) from a "here string" using the <<< operator.

Bash 3.0 supports in-process regular expression matching using a syntax reminiscent of Perl.[35][36]

In February 2009[37] Bash 4.0, introduced support for associative arrays.[34][38] Associative arrays allow a fake support for multi-dimensional (indexed) arrays, in a similar way to AWK. Bash 4.x has not been integrated in newer version of MacOS due to license restrictions.[39]. Associative array example:

```bash
$ declare -A aa        # declare an associative array 'aa' faking a bi-dimensional indexed array
$ i=1; j=2             # initialize some indices
$ aa[$i,$j]=5          # associate value "5" to key "$i,$j" (i.e. "1,2")
$ echo ${aa[$i,$j]}    # print the stored value at key "$i,$j"
5
```

# Bug Reporting

"bashbug" redirects here. For the widely reported September 2014 bug found in Bash, see Shellshock (software bug).
An external command called bashbug reports Bash shell bugs. When the command is invoked, it brings up the user's default editor with a form to fill in. The form is mailed to the Bash maintainers (or optionally to other email addresses).[45][4

The end.

To be continuous.
