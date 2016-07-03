# autoComplete

 Simple plain JS autocomplete for inputs.

## Usage

```html
<link href="autocomplete.min.css" rel="stylesheet">
<input my-autocomplete='{ "list": ["Item1", "Item2", "Item3"], "maxItems": 20, "markItems": true }' 
       placeholder="Try typing here"/>
<script src="autocomplete.min.js"></script>
```

## Features

  - Simple
  - Small (~3kb gzipped including CSS)
  - CSS Hackable
  - Can highlight matching letters
  - Can limit the number of results
  - Relatively fast

## Notes

This was done as a simple project / personnal challenge.

This is clearly aimed at server rendered pages, no AJAX capabilities for now.

I haven't written any test yet and it may have some quirks. :smile:

=> Especially on the placement of the suggestions. You may have to change / override .my-autocomplete > ul { top: 12px  } to another value depending on context. (For now.)

I'll work on other versions, one AJAX focused and another one datalist dependant. (To limit the size of the pages rendered when multiple inputs use the same source.) Another one will include the three possibilities and a last one will not include matching letters to be the smallest possible.

## Author

Terence BARBE

## License 

(The MIT License)

Copyright (c) 2011 Marc Campbell &lt;marc.e.campbell@gmail.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

