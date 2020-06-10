let fs = require('fs')
let file = 'ntfs.dd'
let ntfs = {
    'Bytes Per Sector': '2 bytes',
    'Sectors Per Cluster': '1 bytes',
    'Reserved Sectors': '2 bytes',
    'always 0': '3 bytes',
    'shift1': '2 bytes',
    'Media Descriptor': '1 bytes',
    'always 0 too': '2 bytes',
    'Sectors Per Track': '2 bytes',
    'Number Of Heads': '2 bytes',
    'Hidden Sectors': '4 bytes',
    'shift2': '8 bytes',
    'Total Sectors': '8 bytes',
    'shift3': '16 bytes',
    'Clusters Per File Record Segment': '4 bytes',
    'Clusters Per Index Buffer': '1 bytes',
    'shift4': '3 bytes',
    'Volume Serial Number': '8 bytes',
    'Checksum': '4 bytes'
}
let filling = (t, c = 100, h = ' ') => {
    return new Array(c - t.length).join(h) + t
}
fs.readFile(file, 'hex', (err, data) => {
    if (err) console.error(err)
    Object.keys(ntfs).reduce((num, key) => {
        let target = num + +ntfs[key].split(' ')[0]
        if (!key.startsWith('shift'))
            console.log(key + filling(parseInt(data.slice(num, target), 16).toString(), 60 - key.length))
        return target
    }, 11)
})