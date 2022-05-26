# slugify-mongoose
Generate a unique slug for mongoose.


## Installation
```
npm i --save slugify-mongoose
```

## Usage
``` js
const slugify = require('slugify-mongoose')

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const mySchema = new Schema({
	title: { type: String },
	slug: { type: String, slug: 'title', unique: true },
})

mySchema.plugin(slugify)
```

## Info
There are currently a lot of plugins for mongoose that already generate slugs,
I made this because none of them worked with the web framework [feathers](https://feathersjs.com/).

This plugin also works with [keystone](http://keystonejs.com/).
