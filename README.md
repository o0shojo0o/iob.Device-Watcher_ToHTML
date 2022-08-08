# iob.Device-Watcher_ToHTML
This script creates from the JSON datapoints from [ioBroker.device-watcher](https://github.com/ciddi89/ioBroker.device-watcher) HTML datapoint for embedding in Lovelace via the Markdown Card

![image](https://user-images.githubusercontent.com/19333515/183417533-d34a8328-7d39-4569-a5a3-b7813ba3d09f.png)

## Integration:

```yml
type: markdown
content: |-
  {0_userdata.0.VIS.Device-Watcher.LowBatteryList}
  <small><font color=gray>DataTime: {device-watcher.0.lastCheck}</font></small>
```
