// Require the nedb module
var Datastore = require('nedb'),
	fs = require('fs')

// Initialize two nedb databases: photos and users
var photos = new Datastore({ filename: __dirname + '/data/photos', autoload: true }),
	users = new Datastore({ filename: __dirname + '/data/users', autoload: true });

// Create "unique" index for photo name and user IP
photos.ensureIndex({ fieldName: 'name', unique: true });
users.ensureIndex({ fieldName: 'ip', unique: true });

// Load all images from the public/photos folder in the database
var photos_on_disk = fs.readdirSync(__dirname + '/public/photos');

// Insert the photos in the database. 
photos_on_disk.forEach(function(photo){
	photos.insert({
		name: photo,
		likes: 0,
		dislikes: 0
	});
});

// Make the photos and users data sets available to the code
// that uses require() on this module:
module.exports = {
	photos: photos,
	users: users
};