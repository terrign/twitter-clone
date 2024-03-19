import 'isomorphic-fetch'

const { TextDecoder, TextEncoder, ReadableStream } = require('node:util')

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
})

Object.defineProperty(global, 'performance', {
  writable: true,
})

class LocalStorageMock {
  constructor() {
    this.store = {}
  }

  clear() {
    this.store = {}
  }

  getItem(key) {
    return this.store[key] || null
  }

  setItem(key, value) {
    this.store[key] = String(value)
  }

  removeItem(key) {
    delete this.store[key]
  }
}

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() })

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'random',
  },
})
