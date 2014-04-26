all: clean clonekick.min.js

clonekick.min.js:
	yuicompressor --preserve-semi clonekick.js >$@

clean:
	rm -f clonekick.min.js
