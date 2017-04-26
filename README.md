# win10-find-all-video-capture-devices

**Find all video capture devices on Windows 10.**

This module is a wrapper around the [DeviceInformation.findAllAsync](https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceinformation#methods_FindAllAsync) method from the [Windows.​Devices.​Enumeration](https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration) namespace of the [Universal Windows Platform](https://docs.microsoft.com/en-us/uwp/api/) API.

Thanks to [NodeRT](https://github.com/NodeRT/NodeRT), this module comes prebuilt for Windows 10.

## Installation

```
npm install win10-find-all-video-capture-devices
```

## Quickstart

```js
const isWin10 = require('is-win10')
const findAllVideoCaptureDevices = require('win10-find-all-video-capture-devices')

if (isWin10) {
  findAllVideoCaptureDevices().then(devices => {
    devices.forEach(device => {
      console.log(device)
      /* {
      *   enclosureLocation: {
      *     inDock: false,
      *     inLid: true,
      *     panel: 'front',
      *     rotationAngleInDegreesClockwise: 0
      *   },
      *   id: '{{id}}',
      *   isDefault: false,
      *   isEnabled: true,
      *   kind: 'deviceInterface',
      *   name: '{{name}}',
      *   pairing: {
      *     canPair: false,
      *     isPaired: false,
      *     protectionLevel: 'none'
      *   }
      * }
      */
    })
  })
}
```

## API

### `findAllVideoCaptureDevices()`

- returns a `<Promise>` which:
  - resolves with an `<Array>` of video capture devices
  - rejects with an `<Error>`
      - if used on a non-Windows 10 system
      - if finding the devices failed

For more documentation, check out the code comments, or consult the [official UWP Windows.Devices.Enumeration documentation](https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration).

## License

[WTFPL](http://www.wtfpl.net/) – Do What the F*ck You Want to Public License.

Made with :heart: by [@MarkTiedemann](https://twitter.com/MarkTiedemannDE).