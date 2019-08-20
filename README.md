# harmonizome-app
A native mobile application built on top of the Harmonizome for searching knowledge about human genes. Created using [React Native](https://facebook.github.io/react-native/).

## Abstract
Several online resources are available that enlist properties of human genes, yet most only include information from a hand full of resources and none provide a user with the same experience for the expanding mobile market. To fill this void, we have expanded the popular Harmonizome web application to include a native interface for the iOS and Android platforms. While the knowledge provided is a just a subset of what is available online, a user has access to 70+ publicly available, categorized resources spanning from expression in cells, tissues, and diseases; regulation by transcription factors, chromatin marks, and microRNAs; functional membership in protein complexes, pathways, and ontologies; genetic association with a disease, and differential expression upon treatment of cells with drugs; as well as structural and other genomic features. Given the increasing popularity and technological advancement of such mobile devices, this application allows for quick access to information related to human genes, increasing its user's productivity.
### Implementation and Availability:
The Harmonizome mobile application can be found and downloaded from the [Google Play Store](https://play.google.com/store/apps/details?id=com.maayanlab.harmonizome) for Android devices and [App Store](http://appstore.com/harmonizome) for iOS devices.

## Development
### If you're running it for the first time
```
npm install
yes | sdkmanager --licenses
```
### Android
Test on android (with android emulator open)
```
npx react-native run-android
```

## Deployment
### Android
Note: All the files generated here are sensitive and **should not** get committed.

Generate signed APK
```bash
cd /android/app/
keytool -genkey -v -keystore harmonizome-v1.keystore -alias harmonizome-v1 -keyalg RSA -keysize 2048 -validity 10000
```

```bash
cd /android/
cat << EOF > gradle.properties
MYAPP_RELEASE_STORE_FILE=harmonizome-v1.keystore
MYAPP_RELEASE_KEY_ALIAS=harmonizome-v1
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
EOF
```

Ensure android is installed and in your path
```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

To build the release:
```bash
cd /android
./gradlew assembleRelease

cd app
jarsigner -verbose -keystore harmonizome-v1.keystore build/outputs/apk/release/app-release-unsigned.apk harmonizome-v1

zipalign -f -v 4 build/outputs/apk/release/app-release-unsigned.apk build/outputs/apk/release/app-release.apk
```

*Note:* If zipalign is not in your path, on Mac I found it at: `~/Library/Android/sdk/build-tools/*/zipalign`
