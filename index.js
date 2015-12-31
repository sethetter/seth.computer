var Metalsmith = require('metalsmith');

var moment = require('moment');
var define = require('metalsmith-define');
var drafts = require('metalsmith-drafts');
var markdown = require('metalsmith-markdown');
var layouts = require('metalsmith-layouts');
var permalinks = require('metalsmith-permalinks');
var collections = require('metalsmith-collections');
var feed = require('metalsmith-feed');

Metalsmith(__dirname)
.destination('./_site')
.use(define({
  site: {
    title: 'sethetter.com',
    tagline: 'Code, community and Wichita, KS',
    author: 'Seth Etter',
    url: 'sethetter.com'
  },
  year: moment().format('YYYY'),
  moment: moment
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
    pattern: ':date/:url'
  }]
}))
.use(feed({
  collection: 'posts',
  destination: 'atom.xml'
}))
.build(function(err) {
  if (err) throw err;
});
