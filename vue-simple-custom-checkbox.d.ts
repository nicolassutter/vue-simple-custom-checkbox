import Vue, { PluginFunction, VueConstructor } from 'vue';

declare const VueSimpleCustomCheckbox: VueConstructor<Vue> & { install: PluginFunction<any>; };
export default VueSimpleCustomCheckbox;
