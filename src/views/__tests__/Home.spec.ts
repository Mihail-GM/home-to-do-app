import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'
import Vue from "vue";
import VueCompositionAPI from "@vue/composition-api";

Vue.use(Vuetify)

const localVue = createLocalVue();
localVue.use(VueCompositionAPI);

describe('HelloWorld.vue', () => {

	let wrapper;

	beforeEach(() => {

		wrapper = mount(Home, {
			localVue
		});

	})

	test('renders props.msg when passed', () => {

		const wrapper2 = shallowMount(Home);

		expect(wrapper2.text()).toMatch("Home tasks App");
	})

	test('renders props.msg when passed', () => {
		const localVue = createLocalVue();
		let vuetify = new Vuetify()

		const wrapper = shallowMount(Home, {
			localVue,
			vuetify
		});

		expect(wrapper.text()).toMatch("Home tasks App");
	})

})
