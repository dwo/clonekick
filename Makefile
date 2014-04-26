all: clean clonekick.min.js

clonekick.min.js:
	yuicompressor clonekick.js >$@

clean:
	rm -f clonekick.min.js
