const chai = require('chai');
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised);
const request = require('supertest-as-promised');
var Promise = require("bluebird");


const linkSearch = require('../src/data-gather/wiki')



describe('linkSearch function', function () {
  /**
    *1.It should return an array of results that omits duplicates
  */
  const keyword1 = 'As ia'
  const keyword2 = 'Africa'
  const keyword3 = 'Floyd Mayweather_'


  it('Should return an array of objects that omits duplicates', function () {
    var size1 = linkSearch(keyword1)
    .then((result) => {      
      return result.children.length
    })
    var filteredSize1 = linkSearch(keyword1)
      .then((result) => {
        setLength = new Set(result.children);      
        return setLength.size
      })

    // return expect(Promise.resolve(filteredSize1)).to.eventually.equal(9)
    return Promise.join(filteredSize1, size1, function(test, expected) { 
      return expect(test).to.deep.equal(expected)})
  })

  it('Should return an array of objects that omits duplicates', function () {
    var size2 = linkSearch(keyword2)
    .then((result) => {      
      return result.children.length
    })
    var filteredSize2 = linkSearch(keyword2)
      .then((result) => {
        setLength = new Set(result.children);      
        return setLength.size
      })

    // return expect(Promise.resolve(filteredSize1)).to.eventually.equal(9)
    return Promise.join(filteredSize2, size2, function(test, expected) { 
      return expect(test).to.deep.equal(expected)})
  })

  it('Should return an array of objects that omits duplicates', function () {
    var size3 = linkSearch(keyword3)
    .then((result) => {      
      return result.children.length
    })
    var filteredSize3 = linkSearch(keyword3)
      .then((result) => {
        setLength = new Set(result.children);      
        return setLength.size
      })

    // return expect(Promise.resolve(filteredSize3)).to.eventually.equal(9)
    return Promise.join(filteredSize3, size3, function(test, expected) { 
      return expect(test).to.deep.equal(expected)})
  })

})