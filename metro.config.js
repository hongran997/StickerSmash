const { getDefaultConfig } = require('expo/metro-config');
/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname);

// 添加对 assets/web 的支持
config.resolver.assetExts.push('html');

module.exports = config;