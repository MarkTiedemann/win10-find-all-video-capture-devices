const os = require('os')
const api = require('./prebuilt/windows.devices.enumeration')
const invertObject = require('./lib/invert-object')
const iterableToArray = require('./lib/iterable-to-array')

const panel = invertObject(api.Panel)
const kind = invertObject(api.DeviceInformationKind)
const protectionLevel = invertObject(api.DevicePairingProtectionLevel)

const findDeviceInfoCollection = () => new Promise((resolve, reject) =>
  // DeviceInformation.findAllAsync: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceinformation#methods_FindAllAsync
  // DeviceClass: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceclass
  api.DeviceInformation.findAllAsync(api.DeviceClass.videoCapture, (err, deviceInfoCollection) => err
    ? reject(err)
    : resolve(deviceInfoCollection))
)

const sanitizeDeviceInfoCollection = deviceInfoCollection => {
  // EnclosureLocation: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.enclosurelocation
  const enclosureLocation = o => ({
    inDock: o.inDock,
    inLid: o.inLid,
    panel: panel[o.panel],
    rotationAngleInDegreesClockwise: o.rotationAngleInDegreesClockwise
  })

  // DeviceInformationPairing: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceinformationpairing
  const pairing = o => ({
    canPair: o.canPair,
    isPaired: o.isPaired,
    protectionLevel: protectionLevel[o.protectionLevel]
  })

  // DeviceInformation: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceinformation
  const deviceInfo = o => ({
    enclosureLocation: enclosureLocation(o.enclosureLocation),
    id: o.id,
    isDefault: o.isDefault,
    isEnabled: o.isEnabled,
    kind: kind[o.kind],
    name: o.name,
    pairing: pairing(o.pairing)
  })

  // DeviceInformationCollection: https://docs.microsoft.com/en-us/uwp/api/windows.devices.enumeration.deviceinformationcollection
  return iterableToArray(deviceInfoCollection)
    .map(deviceInfo)
}

module.exports = () => {
  if (!os.platform().startsWith('win')) {
    throw new Error('E_WINDOWS_ONLY')
  }

  if (!os.release().startsWith('10')) {
    throw new Error('E_WINDOWS_10_ONLY')
  }

  return findDeviceInfoCollection()
    .then(sanitizeDeviceInfoCollection)
}
