# Document Script.

A simple script language that is designed to control DOM elements.

Just for fun :)

[Demo](https://lancercomet.github.io/Document-Script/demo/demo.html) is here.

## Usage
```ruby
# Create a div element and name it as "myDiv".
create div as myDiv

# Set styles for myDiv.
style myDiv width 200px
style myDiv height 300px
style myDiv backgroundColor red

# Select HTML element body as variable "body".
select body as body

# Append myDiv to body.
append myDiv to body

# Select all paragraph elements, and make text color cadetblue.
select p as paragraphs
each paragraphs style color cadetblue
```

## License.
MIT
