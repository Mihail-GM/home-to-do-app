import {shallowMount, mount, createLocalVue, Wrapper} from '@vue/test-utils'
import Home from "@/views/Home.vue";
import Vuetify from 'vuetify'
import TheLayoutWrap from "@/layouts/TheLayoutWrap.vue";


describe('HelloWorld.vue', () => {


    let wrapper: Wrapper<Record<never, any> & TheLayoutWrap>;

    beforeEach(() => {
        const localVue = createLocalVue();
        localVue.use(Vuetify);

        wrapper = mount(Home, {
            localVue
        });

    })
    //
    // test('router push correct URL when click on task icon', () => {
    //
    //
    //     // expect(wrapper.is(TheLayoutWrap)).toBe(true);
    //
    //     expect(wrapper.find("#menu-link-1").exists()).toBe(true);
    //
    //
    // })


    test('renders props.msg when passed', () => {

        const wrapper2 = shallowMount(Home);

        expect(wrapper2.text()).toMatch("Home tasks App");
    })

    test('renders props.msg when passed', () => {
        const localVue = createLocalVue();
        let vuetify = new Vuetify()

        const wrapper = mount(Home, {
            localVue,
            vuetify
        });

        // expect(wrapper.find(".v-navigation-drawer").exists()).toBe(true);

        expect(wrapper.text()).toMatch("Home tasks App");
    })

})
