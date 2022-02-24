Object.defineProperty(URL, "createObjectURL", {
  writable: true,
  value: jest.fn(),
});
Object.defineProperty(URL, "revokeObjectURL", {
  writable: true,
  value: jest.fn(),
});

export {};
