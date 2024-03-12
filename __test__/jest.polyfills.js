const { TextDecoder, TextEncoder, ReadableStream } = require('node:util')

Object.defineProperties(globalThis, {
  TextDecoder: { value: TextDecoder },
  TextEncoder: { value: TextEncoder },
  ReadableStream: { value: ReadableStream },
})

const { Blob, File } = require('node:buffer')

const performance = require('perf_hooks').performance

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

Object.defineProperties(globalThis, {
  Blob: { value: Blob },
  File: { value: File },
  performance: { value: performance },
})

Object.defineProperty(window, 'localStorage', { value: new LocalStorageMock() })

Object.defineProperty(globalThis, 'crypto', {
  value: {
    randomUUID: () => 'random',
  },
})

// HTMLCanvasElement.prototype.getContext = () => {};

// window.URL.createObjectURL = function () {};
