var Metalsmith = require('metalsmith');

var define = require('metalsmith-define');
var drafts = require('metalsmith-drafts');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');

Metalsmith(__dirname)
.destination('./_site')
.use(define({
  site: {
    title: 'sethetter.com',
    tagline: 'Code, community and Wichita, KS'
  }
}))
.use(collections({
  posts: {
    sortBy: 'date',
    reverse: true
  }
}))
.use(drafts())
.use(markdown())
.use(layouts({
  engine: 'swig',
  directory: './layouts'
}))
.use(permalinks({
  linksets: [{
    match: { collection: 'posts' },
    pattern: 'posts/:url'
  }]
}))
.build(function(err) {
  if (err) throw err;
});
