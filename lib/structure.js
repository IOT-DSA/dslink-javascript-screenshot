export const defaultNodes = {
  screenshot: {
    $is: 'screenshot',
    $invokable: 'write',
    $params: [
      {
        name: 'text',
        type: 'string'
      },
      {
        name: 'isHTML',
        type: 'bool',
        'default': false
      },
      {
        name: 'width',
        type: 'int',
        default: 1920
      },
      {
        name: 'height',
        type: 'int',
        default: 1080
      }
    ],
    $columns: [
      {
        name: 'png',
        type: 'binary'
      }
    ]
  }
};
