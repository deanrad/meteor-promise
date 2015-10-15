import assert from 'assert'
import _ from 'underscore'
let {extend} = _
import {expect} from 'chai'

// should probably import this class
class Greeter {
  constructor(greeting='Hello', target='World') {
    extend(this, {greeting, target})
  }
  getGreeting() {
    return this.greeting + ' ' + this.target
  }
}

describe('test index', () => { 
  let subject; 
  before(() => { 
    subject = new Greeter();
  }) 
  it('should instantiate with defaults', () => { 
    expect(subject.greeting).to.equal('Hello')
    expect(subject.target).to.equal('World')
  })

  it('should return a combined greeting', () =>  {
    expect(subject.getGreeting()).to.equal('Hello World')
  })
})
