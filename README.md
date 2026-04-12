# RestaurantChooser (餐厅选择器)
A cross-platform mobile application built with React Native & Expo that helps users randomly select restaurants based on participants, preferences and filters.  
一款基于 React Native + Expo 开发的跨平台移动应用，帮助用户根据参与人员、偏好和筛选条件随机选择餐厅。

##  App Download (应用下载)
### Android Build (安卓安装包)
You can download the latest Android build and install it on your Android emulator/device:  
可下载最新安卓构建包，安装到安卓模拟器/真机：  
https://expo.dev/accounts/chenwenle/projects/RestaurantChooser/builds/0a77390d-e8cd-447c-b7de-10a44097498a
### iOS Build (iOS安装包说明)
Currently, no iOS build is provided because the developer does not have an Apple Developer Account. However, the code is fully compatible with iOS — you can generate an iOS build by following the instructions below.  
当前暂未提供iOS安装包（开发者暂无苹果开发者账户），但代码已完全适配iOS系统，可按以下指引自行构建iOS包。


##  Core Features (核心功能)
### English
1. **Participant Selection**: Select who will join the meal, with checkbox-based multi-selection.
2. **Hardware Back Button Handling (Android)**: Custom back button confirmation dialog to prevent accidental exits.
3. **Local Data Persistence**: Save participant data locally using AsyncStorage for offline access.
4. **Validation Logic**: Ensure at least one participant is selected before proceeding to the next step.
5. **Cross-platform Compatibility**: Works on Android (iOS build available via Expo EAS).


##  Tech Stack (技术栈)
| Category (分类)       | Technologies (技术)                                                                 |
|-----------------------|-------------------------------------------------------------------------------------|
| Core Framework        | React Native, Expo                                                                 |
| State Management      | React Hooks (useState, useEffect, useCallback, useFocusEffect)                      |
| Navigation            | React Navigation (Stack/Top Tab Navigator)                                          |
| Local Storage         | @react-native-async-storage/async-storage                                            |
| UI Components         | Expo Checkbox, Custom Button/Input Components, FlatList                             |
| Build Tool            | Expo EAS Build (Android/iOS packaging)                                              |

##  Quick Start (快速开始)
### Prerequisites (前置条件)
- Node.js (v18+ recommended)
- Expo CLI (`npm install -g expo-cli`)
- Android Emulator/iOS Simulator or physical device with Expo Go installed

### Installation & Run (安装与运行)
```bash
# 1. Clone the repository (克隆仓库)
git clone https://github.com/fengrenyuanhe0-collab/-RestaurantChooser.git

# 2. Enter project directory (进入项目目录)
cd -RestaurantChooser

# 3. Install dependencies (安装依赖)
npm install

# 4. Start development server (启动开发服务)
npx expo start --clear

# 5. Run on device/emulator (运行到设备/模拟器)
# - Press "a" for Android emulator
# - Press "i" for iOS simulator (macOS only)
# - Scan QR code with Expo Go for physical device

# Build Android preview package (构建安卓测试包)
npx eas build --platform android --profile preview
#Build Android production package (构建安卓生产包，用于Google Play上架)
npx eas build --platform android --profile production

# Build iOS preview package (构建iOS测试包，需苹果开发者账户)
npx eas build --platform ios --profile preview
# Build iOS production package (构建iOS生产包，用于App Store上架)
npx eas build --platform ios --profile production

