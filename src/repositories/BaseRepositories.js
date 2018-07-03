let db = require('../../models');

class BaseRepository {
	constructor(modelName) {
		if (!modelName) {
			throw new Error('model name is empty');
		}

		if (!db[modelName]) {
			throw new Error(`${modelName} is not defined`);
		}

		this._model = db[modelName];
	}

	static getInstance() {
		// let key = this._model;
		let key = (this).name;
		if (!BaseRepository._instances) {
			BaseRepository._instances = {};
		}
		if (!BaseRepository._instances[key]) {
			this._instances[key] = new this();
		}

		return this._instances[key];
	}

	create(data) {
		return new Promise((resolve, reject) => {
			this._model.create(data)
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	find(filter) {
		return new Promise((resolve, reject) => {
			this._model.find(filter)
				.then((results) => {
					resolve(results);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findAll(filter) {
		return new Promise((resolve, reject) => {
			this._model.findAll(filter)
				.then((results) => {
					resolve(results);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findById(id) {
		return new Promise((resolve, reject) => {
			this._model.findById(id)
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	findOne(filter) {
		return new Promise((resolve, reject) => {
			this._model.findOne(filter)
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	count(filter) {
		return new Promise((resolve, reject) => {
			this._model.count(filter)
				.then((count) => {
					resolve(count);
				}).catch((err) => {
					reject(err);
				})
		})
	}

	groupBy(field) {
		return new Promise((resolve, reject) => {
			this._model.findAll({
				attributes: [field],
				group: field,
				where: {
					id: {
						$gte: 1,
					}
				}
			})
				.then((result) => {
					resolve(result);
				}).catch((err) => {
					reject(err);
				})
		})
	}
}

module.exports = BaseRepository;