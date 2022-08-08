const dp_batteryList = 'device-watcher.0.batteryList';
const dp_batteryListHTML = '0_userdata.0.VIS.Device-Watcher.BatteryList';
const dp_linkQualityList = 'device-watcher.0.linkQualityList';
const dp_linkQualityHTML = '0_userdata.0.VIS.Device-Watcher.LinkQualityList';
const dp_lowBatteryList = 'device-watcher.0.lowBatteryList';
const dp_lowBatteryListHTML = '0_userdata.0.VIS.Device-Watcher.LowBatteryList';
const dp_offlineList = 'device-watcher.0.offlineList';
const dp_offlineListHTML = '0_userdata.0.VIS.Device-Watcher.OfflineList';

createState(dp_batteryListHTML, { name: 'Battery List - HTML', type: 'string', read: true, write: false });
createState(dp_linkQualityHTML, { name: 'Link Quality List - HTML', type: 'string', read: true, write: false });
createState(dp_lowBatteryListHTML, { name: 'Low Battery List - HTML', type: 'string', read: true, write: false });
createState(dp_offlineListHTML, { name: 'Offline List - HTML', type: 'string', read: true, write: false });

createBatteryListHTML(getState(dp_batteryList).val);
creatLinkQualityListHTML(getState(dp_linkQualityList).val);
createBatteryListHTML(getState(dp_lowBatteryList).val, true);
createOfflineListHTML(getState(dp_offlineList).val);

on({ id: dp_batteryList, change: 'ne' }, (obj) => {
    createBatteryListHTML(obj.state.val);
});

on({ id: dp_linkQualityList, change: 'ne' }, (obj) => {
    creatLinkQualityListHTML(obj.state.val);
});

on({ id: dp_lowBatteryList, change: 'ne' }, (obj) => {
    createBatteryListHTML(obj.state.val, true);
});

on({ id: dp_offlineList, change: 'ne' }, (obj) => {
    createOfflineListHTML(obj.state.val);
});

function creatLinkQualityListHTML(devices) {
    devices = devices.sort((a, b) => { return a.Device.localeCompare(b.Device); });
    const deviceCount = devices.filter(x => x.Adapter != '--none--').length;
    let html = `<center>
    <b>Link Quality Devices:<font> ${deviceCount}</b><small></small></font>
    <p></p>
    </center>   
    <table width=100%>
    <tr>
    <th align=left>Device</th>
    <th align=center width=120>Adapter</th>
    <th align=right>Link Quality</th>
    </tr>
    <tr>
    <td colspan="5"><hr></td>
    </tr>`;

    for (const device of devices) {
        html += `</tr>`
        html += `<td><font>${device.Device}</font></td>`
        html += `<td align=center><font>${device.Adapter}</font></td>`
        html += `<td align=right><font>${device['Signal strength']}</font></td>`
        html += `</tr>`;
    }

    html += '</table>';
    setState(dp_linkQualityHTML, html, true);
}

function createOfflineListHTML(devices) {
    devices = devices.sort((a, b) => { return a.Device.localeCompare(b.Device); });
    const deviceCount = devices.filter(x => x.Adapter != '--none--').length;
    let html = `<center>
    <b>Offline Devices: <font color=${deviceCount == 0 ? '#3bcf0e' : 'orange'}>${deviceCount}</b><small></small></font>
    <p></p>
    </center>   
    <table width=100%>
    <tr>
    <th align=left>Device</th>
    <th align=center width=120>Adapter</th>
    <th align=center>Letzter Kontakt</th>
    </tr>
    <tr>
    <td colspan="5"><hr></td>
    </tr>`;

    for (const device of devices) {
        html += `</tr>`
        html += `<td><font>${device.Device}</font></td>`
        html += `<td align=center><font>${device.Adapter}</font></td>`
        html += `<td align=center><font color=orange>${device['Last contact']}</font></td>`
        html += `</tr>`;
    }

    html += '</table>';
    setState(dp_offlineListHTML, html, true);
}

function createBatteryListHTML(devices, isLowBatteryList) {
    devices = devices.sort((a, b) => { return a.Device.localeCompare(b.Device); });
    const deviceCount = devices.filter(x => x.Adapter != '--none--').length;
    let html = `<center>
    <b>${isLowBatteryList == true ? 'Schwache ' : ''}Batterie Devices: <font color=${isLowBatteryList == true ? (deviceCount > 0 ? 'orange' : '#3bcf0e') : ''}>${deviceCount}</b></font>
    <p></p>
    </center>   
    <table width=100%>
    <tr>
    <th align=left>Device</th>
    <th align=center width=120>Adapter</th>
    <th align=${isLowBatteryList ? 'center' : 'right'}>Batterie</th>
    </tr>
    <tr>
    <td colspan="5"><hr></td>
    </tr>`;

    for (const device of devices) {
        html += `</tr>`
        html += `<td><font>${device.Device}</font></td>`
        html += `<td align=center><font>${device.Adapter}</font></td>`
        if (isLowBatteryList) {
            html += `<td align=center><font color=orange>${device.Battery == ' - ' ? 'schwach' : device.Battery}</font></td>`
        } else {
            html += `<td align=right><font color=#3bcf0e>${device.Battery == ' - ' ? 'ok' : device.Battery}</font></td>`
        }

        html += `</tr>`;
    }

    html += '</table>';

    if (isLowBatteryList == true) {
        setState(dp_lowBatteryListHTML, html, true);
    } else {
        setState(dp_batteryListHTML, html, true);
    }
}

