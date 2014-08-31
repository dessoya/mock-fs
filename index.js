'use strict'

var Class			= require('class')


var Stat = Class.inherit({

	onCreate: function(stat) {
		this.stat = stat
		this.size = stat.size
		this.mtime = new Date(stat.mtime)
	}

})

var Mock = Class.inherit({

	onCreate: function(data) {
		this.data = data
	},

	updateFileInfo: function(path, info) {
		if(info.stat) {
			for(var key in info.stat) {
				this.data.files[path].stat[key] = info.stat[key]
			}
		}
	},

	stat: function(path, callback) {

		var self = this
		process.nextTick(function() {
			
			if(path in self.data.files) {
				if(self.data.files[path].stat)
					return callback(null, Stat.create(self.data.files[path].stat))
			}

			callback(new Error('file '+path+' absent'))

		})

	}

})



function createMock(data) {
	return Mock.create(data)
}

module.exports = createMock
