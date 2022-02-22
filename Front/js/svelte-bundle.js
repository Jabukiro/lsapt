
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);
    function outro_and_destroy_block(block, lookup) {
        transition_out(block, 1, 1, () => {
            lookup.delete(block.key);
        });
    }
    function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block, next, get_context) {
        let o = old_blocks.length;
        let n = list.length;
        let i = o;
        const old_indexes = {};
        while (i--)
            old_indexes[old_blocks[i].key] = i;
        const new_blocks = [];
        const new_lookup = new Map();
        const deltas = new Map();
        i = n;
        while (i--) {
            const child_ctx = get_context(ctx, list, i);
            const key = get_key(child_ctx);
            let block = lookup.get(key);
            if (!block) {
                block = create_each_block(key, child_ctx);
                block.c();
            }
            else if (dynamic) {
                block.p(child_ctx, dirty);
            }
            new_lookup.set(key, new_blocks[i] = block);
            if (key in old_indexes)
                deltas.set(key, Math.abs(i - old_indexes[key]));
        }
        const will_move = new Set();
        const did_move = new Set();
        function insert(block) {
            transition_in(block, 1);
            block.m(node, next);
            lookup.set(block.key, block);
            next = block.first;
            n--;
        }
        while (o && n) {
            const new_block = new_blocks[n - 1];
            const old_block = old_blocks[o - 1];
            const new_key = new_block.key;
            const old_key = old_block.key;
            if (new_block === old_block) {
                // do nothing
                next = new_block.first;
                o--;
                n--;
            }
            else if (!new_lookup.has(old_key)) {
                // remove old block
                destroy(old_block, lookup);
                o--;
            }
            else if (!lookup.has(new_key) || will_move.has(new_key)) {
                insert(new_block);
            }
            else if (did_move.has(old_key)) {
                o--;
            }
            else if (deltas.get(new_key) > deltas.get(old_key)) {
                did_move.add(new_key);
                insert(new_block);
            }
            else {
                will_move.add(old_key);
                o--;
            }
        }
        while (o--) {
            const old_block = old_blocks[o];
            if (!new_lookup.has(old_block.key))
                destroy(old_block, lookup);
        }
        while (n)
            insert(new_blocks[n - 1]);
        return new_blocks;
    }
    function validate_each_keys(ctx, list, get_context, get_key) {
        const keys = new Set();
        for (let i = 0; i < list.length; i++) {
            const key = get_key(get_context(ctx, list, i));
            if (keys.has(key)) {
                throw new Error('Cannot have duplicate keys in a keyed each');
            }
            keys.add(key);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.44.1' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/cartProductCard.svelte generated by Svelte v3.44.1 */

    const file$2 = "src/components/cartProductCard.svelte";

    function create_fragment$3(ctx) {
    	let div9;
    	let div0;
    	let h4;
    	let t0_value = /*product*/ ctx[0].name + "";
    	let t0;
    	let t1;
    	let button0;
    	let span0;
    	let t3;
    	let div4;
    	let img;
    	let img_src_value;
    	let t4;
    	let div3;
    	let p;
    	let raw_value = `${/*product*/ ctx[0].attributes}<br>${/*product*/ ctx[0].description}` + "";
    	let t5;
    	let div2;
    	let span1;
    	let t6_value = `$${(/*product*/ ctx[0].fee * /*product*/ ctx[0].count).toFixed(2)}` + "";
    	let t6;
    	let t7;
    	let div1;
    	let button1;
    	let t8;
    	let input;
    	let input_value_value;
    	let t9;
    	let button2;
    	let t10;
    	let div8;
    	let div5;
    	let t11;
    	let div6;
    	let t12;
    	let div7;
    	let div9_data_loading_id_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div9 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			button0 = element("button");
    			span0 = element("span");
    			span0.textContent = "Remove";
    			t3 = space();
    			div4 = element("div");
    			img = element("img");
    			t4 = space();
    			div3 = element("div");
    			p = element("p");
    			t5 = space();
    			div2 = element("div");
    			span1 = element("span");
    			t6 = text(t6_value);
    			t7 = space();
    			div1 = element("div");
    			button1 = element("button");
    			t8 = space();
    			input = element("input");
    			t9 = space();
    			button2 = element("button");
    			t10 = space();
    			div8 = element("div");
    			div5 = element("div");
    			t11 = space();
    			div6 = element("div");
    			t12 = space();
    			div7 = element("div");
    			attr_dev(h4, "class", "h5");
    			add_location(h4, file$2, 9, 4, 269);
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$2, 17, 6, 478);
    			attr_dev(button0, "id", "removeItemBtn");
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "close small-font");
    			attr_dev(button0, "aria-label", "Remove product");
    			add_location(button0, file$2, 10, 4, 308);
    			attr_dev(div0, "class", "cart-product-card-header d-flex flex-row justify-content-between");
    			add_location(div0, file$2, 8, 2, 186);
    			if (!src_url_equal(img.src, img_src_value = /*product*/ ctx[0].image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Product");
    			attr_dev(img, "class", "cart-product-image");
    			set_style(img, "margin-top", "auto");
    			set_style(img, "margin-bottom", "auto");
    			add_location(img, file$2, 21, 4, 602);
    			add_location(p, file$2, 28, 6, 795);
    			attr_dev(span1, "class", "small-font font-weight-bold");
    			add_location(span1, file$2, 30, 8, 913);
    			attr_dev(button1, "class", "minus-button disable_button_bacground");
    			add_location(button1, file$2, 34, 10, 1085);
    			attr_dev(input, "class", "cart-product-quantity-amount disable_button_bacground text-center");
    			input.value = input_value_value = /*product*/ ctx[0].count;
    			add_location(input, file$2, 38, 10, 1213);
    			attr_dev(button2, "class", "plus-button disable_button_bacground");
    			add_location(button2, file$2, 42, 10, 1363);
    			attr_dev(div1, "class", "cart-product-quantity");
    			add_location(div1, file$2, 33, 8, 1039);
    			attr_dev(div2, "class", "cart-product-card-bottom");
    			add_location(div2, file$2, 29, 6, 866);
    			attr_dev(div3, "class", "cart-product-description");
    			add_location(div3, file$2, 27, 4, 750);
    			attr_dev(div4, "class", "cart-product-card-content d-flex flex-row");
    			add_location(div4, file$2, 20, 2, 542);
    			attr_dev(div5, "class", "line");
    			add_location(div5, file$2, 51, 4, 1595);
    			attr_dev(div6, "class", "subline inc");
    			add_location(div6, file$2, 52, 4, 1620);
    			attr_dev(div7, "class", "subline dec");
    			add_location(div7, file$2, 53, 4, 1652);
    			attr_dev(div8, "id", "storeCreationLoading");
    			attr_dev(div8, "class", "angel-linear-loading");
    			add_location(div8, file$2, 50, 2, 1530);
    			attr_dev(div9, "class", "cart-product-card");
    			attr_dev(div9, "data-loading-id", div9_data_loading_id_value = /*product*/ ctx[0].id);
    			add_location(div9, file$2, 7, 0, 123);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div9, anchor);
    			append_dev(div9, div0);
    			append_dev(div0, h4);
    			append_dev(h4, t0);
    			append_dev(div0, t1);
    			append_dev(div0, button0);
    			append_dev(button0, span0);
    			append_dev(div9, t3);
    			append_dev(div9, div4);
    			append_dev(div4, img);
    			append_dev(div4, t4);
    			append_dev(div4, div3);
    			append_dev(div3, p);
    			p.innerHTML = raw_value;
    			append_dev(div3, t5);
    			append_dev(div3, div2);
    			append_dev(div2, span1);
    			append_dev(span1, t6);
    			append_dev(div2, t7);
    			append_dev(div2, div1);
    			append_dev(div1, button1);
    			append_dev(div1, t8);
    			append_dev(div1, input);
    			append_dev(div1, t9);
    			append_dev(div1, button2);
    			append_dev(div9, t10);
    			append_dev(div9, div8);
    			append_dev(div8, div5);
    			append_dev(div8, t11);
    			append_dev(div8, div6);
    			append_dev(div8, t12);
    			append_dev(div8, div7);

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*removeItem*/ ctx[3](/*product*/ ctx[0].id))) /*removeItem*/ ctx[3](/*product*/ ctx[0].id).apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button1,
    						"click",
    						function () {
    							if (is_function(/*decrementItem*/ ctx[2]())) /*decrementItem*/ ctx[2]().apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(
    						button2,
    						"click",
    						function () {
    							if (is_function(/*incrementItem*/ ctx[1]())) /*incrementItem*/ ctx[1]().apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*product*/ 1 && t0_value !== (t0_value = /*product*/ ctx[0].name + "")) set_data_dev(t0, t0_value);

    			if (dirty & /*product*/ 1 && !src_url_equal(img.src, img_src_value = /*product*/ ctx[0].image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*product*/ 1 && raw_value !== (raw_value = `${/*product*/ ctx[0].attributes}<br>${/*product*/ ctx[0].description}` + "")) p.innerHTML = raw_value;			if (dirty & /*product*/ 1 && t6_value !== (t6_value = `$${(/*product*/ ctx[0].fee * /*product*/ ctx[0].count).toFixed(2)}` + "")) set_data_dev(t6, t6_value);

    			if (dirty & /*product*/ 1 && input_value_value !== (input_value_value = /*product*/ ctx[0].count) && input.value !== input_value_value) {
    				prop_dev(input, "value", input_value_value);
    			}

    			if (dirty & /*product*/ 1 && div9_data_loading_id_value !== (div9_data_loading_id_value = /*product*/ ctx[0].id)) {
    				attr_dev(div9, "data-loading-id", div9_data_loading_id_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div9);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CartProductCard', slots, []);
    	let { product } = $$props;
    	let { incrementItem } = $$props;
    	let { decrementItem } = $$props;
    	let { removeItem } = $$props;
    	const writable_props = ['product', 'incrementItem', 'decrementItem', 'removeItem'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CartProductCard> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('product' in $$props) $$invalidate(0, product = $$props.product);
    		if ('incrementItem' in $$props) $$invalidate(1, incrementItem = $$props.incrementItem);
    		if ('decrementItem' in $$props) $$invalidate(2, decrementItem = $$props.decrementItem);
    		if ('removeItem' in $$props) $$invalidate(3, removeItem = $$props.removeItem);
    	};

    	$$self.$capture_state = () => ({
    		product,
    		incrementItem,
    		decrementItem,
    		removeItem
    	});

    	$$self.$inject_state = $$props => {
    		if ('product' in $$props) $$invalidate(0, product = $$props.product);
    		if ('incrementItem' in $$props) $$invalidate(1, incrementItem = $$props.incrementItem);
    		if ('decrementItem' in $$props) $$invalidate(2, decrementItem = $$props.decrementItem);
    		if ('removeItem' in $$props) $$invalidate(3, removeItem = $$props.removeItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [product, incrementItem, decrementItem, removeItem];
    }

    class CartProductCard extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			product: 0,
    			incrementItem: 1,
    			decrementItem: 2,
    			removeItem: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CartProductCard",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*product*/ ctx[0] === undefined && !('product' in props)) {
    			console.warn("<CartProductCard> was created without expected prop 'product'");
    		}

    		if (/*incrementItem*/ ctx[1] === undefined && !('incrementItem' in props)) {
    			console.warn("<CartProductCard> was created without expected prop 'incrementItem'");
    		}

    		if (/*decrementItem*/ ctx[2] === undefined && !('decrementItem' in props)) {
    			console.warn("<CartProductCard> was created without expected prop 'decrementItem'");
    		}

    		if (/*removeItem*/ ctx[3] === undefined && !('removeItem' in props)) {
    			console.warn("<CartProductCard> was created without expected prop 'removeItem'");
    		}
    	}

    	get product() {
    		throw new Error("<CartProductCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set product(value) {
    		throw new Error("<CartProductCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get incrementItem() {
    		throw new Error("<CartProductCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set incrementItem(value) {
    		throw new Error("<CartProductCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get decrementItem() {
    		throw new Error("<CartProductCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set decrementItem(value) {
    		throw new Error("<CartProductCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get removeItem() {
    		throw new Error("<CartProductCard>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set removeItem(value) {
    		throw new Error("<CartProductCard>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/cartContent.svelte generated by Svelte v3.44.1 */
    const file$1 = "src/components/cartContent.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (105:4) {#each cartList as product (product.id)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let cartproduct;
    	let current;

    	function func() {
    		return /*func*/ ctx[8](/*product*/ ctx[11]);
    	}

    	function func_1() {
    		return /*func_1*/ ctx[9](/*product*/ ctx[11]);
    	}

    	cartproduct = new CartProductCard({
    			props: {
    				product: /*product*/ ctx[11],
    				incrementItem: func,
    				decrementItem: func_1,
    				removeItem: /*removeItem*/ ctx[6]
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(cartproduct.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(cartproduct, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const cartproduct_changes = {};
    			if (dirty & /*cartList*/ 2) cartproduct_changes.product = /*product*/ ctx[11];
    			if (dirty & /*cartList*/ 2) cartproduct_changes.incrementItem = func;
    			if (dirty & /*cartList*/ 2) cartproduct_changes.decrementItem = func_1;
    			cartproduct.$set(cartproduct_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cartproduct.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cartproduct.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(cartproduct, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(105:4) {#each cartList as product (product.id)}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div1;
    	let div0;
    	let h2;
    	let t1;
    	let label;
    	let t2_value = /*cartList*/ ctx[1].length + "";
    	let t2;
    	let t3;
    	let button0;
    	let span0;
    	let t5;
    	let div8;
    	let div2;
    	let each_blocks = [];
    	let each_1_lookup = new Map();
    	let t6;
    	let div7;
    	let div6;
    	let div3;
    	let span1;
    	let t8;
    	let span2;
    	let t9_value = `$${/*subTotal*/ ctx[2].toFixed(2)}` + "";
    	let t9;
    	let t10;
    	let div4;
    	let t11;
    	let div5;
    	let span3;
    	let t13;
    	let span4;
    	let t14_value = `$${/*total*/ ctx[3].toFixed(2)}` + "";
    	let t14;
    	let t15;
    	let form;
    	let button1;
    	let t17;
    	let span5;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*cartList*/ ctx[1];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*product*/ ctx[11].id;
    	validate_each_keys(ctx, each_value, get_each_context, get_key);

    	for (let i = 0; i < each_value.length; i += 1) {
    		let child_ctx = get_each_context(ctx, each_value, i);
    		let key = get_key(child_ctx);
    		each_1_lookup.set(key, each_blocks[i] = create_each_block(key, child_ctx));
    	}

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			h2 = element("h2");
    			h2.textContent = "Shopping Cart";
    			t1 = space();
    			label = element("label");
    			t2 = text(t2_value);
    			t3 = space();
    			button0 = element("button");
    			span0 = element("span");
    			span0.textContent = "×";
    			t5 = space();
    			div8 = element("div");
    			div2 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t6 = space();
    			div7 = element("div");
    			div6 = element("div");
    			div3 = element("div");
    			span1 = element("span");
    			span1.textContent = "SUBTOTAL:";
    			t8 = space();
    			span2 = element("span");
    			t9 = text(t9_value);
    			t10 = space();
    			div4 = element("div");
    			t11 = space();
    			div5 = element("div");
    			span3 = element("span");
    			span3.textContent = "Total:";
    			t13 = space();
    			span4 = element("span");
    			t14 = text(t14_value);
    			t15 = space();
    			form = element("form");
    			button1 = element("button");
    			button1.textContent = "Proceed to Checkout";
    			t17 = space();
    			span5 = element("span");
    			span5.textContent = "We accept Debit cards.";
    			attr_dev(h2, "class", "h3");
    			add_location(h2, file$1, 90, 4, 2407);
    			attr_dev(label, "for", "cart-drawer");
    			attr_dev(label, "class", "small-font");
    			add_location(label, file$1, 91, 4, 2445);
    			attr_dev(div0, "class", "cart-header-main");
    			add_location(div0, file$1, 89, 2, 2372);
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$1, 99, 4, 2633);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "close");
    			attr_dev(button0, "aria-label", "Close Cart");
    			add_location(button0, file$1, 93, 2, 2526);
    			attr_dev(div1, "class", "cart-header");
    			add_location(div1, file$1, 88, 0, 2344);
    			attr_dev(div2, "class", "mb-5 cart-body");
    			add_location(div2, file$1, 103, 2, 2726);
    			attr_dev(span1, "class", "font-weight-bold text-uppercase");
    			add_location(span1, file$1, 118, 8, 3234);
    			attr_dev(span2, "class", "font-weight-bold");
    			add_location(span2, file$1, 119, 8, 3305);
    			attr_dev(div3, "class", "cart-checkout-subtotals d-flex flex-row justify-content-between small-font");
    			add_location(div3, file$1, 115, 6, 3122);
    			attr_dev(div4, "class", "horizontal-divider");
    			set_style(div4, "margin", "0.5rem 0");
    			add_location(div4, file$1, 121, 6, 3390);
    			attr_dev(span3, "class", "font-weight-bold text-uppercase");
    			add_location(span3, file$1, 125, 8, 3564);
    			attr_dev(span4, "class", "font-weight-bold");
    			add_location(span4, file$1, 126, 8, 3632);
    			attr_dev(div5, "class", "cart-checkout-estimated-totals d-flex flex-row justify-content-between");
    			add_location(div5, file$1, 122, 6, 3456);
    			attr_dev(div6, "class", "cart-checkout-totals mb-3");
    			add_location(div6, file$1, 114, 4, 3076);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "btn btn-dark btn-accent mb-2");
    			add_location(button1, file$1, 134, 6, 3871);
    			attr_dev(span5, "class", "cart-checkout-info");
    			add_location(span5, file$1, 137, 6, 3981);
    			attr_dev(form, "action", "/checkout");
    			attr_dev(form, "class", "cart-checkout-proceed d-flex flex-column align-items-center");
    			add_location(form, file$1, 129, 4, 3723);
    			attr_dev(div7, "class", "cart-checkout svelte-i88o4s");
    			toggle_class(div7, "displayHide", /*cartList*/ ctx[1].length === 0);
    			add_location(div7, file$1, 113, 2, 3002);
    			attr_dev(div8, "class", "cart-body-wrapper");
    			add_location(div8, file$1, 102, 0, 2692);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, h2);
    			append_dev(div0, t1);
    			append_dev(div0, label);
    			append_dev(label, t2);
    			append_dev(div1, t3);
    			append_dev(div1, button0);
    			append_dev(button0, span0);
    			insert_dev(target, t5, anchor);
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div2);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div2, null);
    			}

    			append_dev(div8, t6);
    			append_dev(div8, div7);
    			append_dev(div7, div6);
    			append_dev(div6, div3);
    			append_dev(div3, span1);
    			append_dev(div3, t8);
    			append_dev(div3, span2);
    			append_dev(span2, t9);
    			append_dev(div6, t10);
    			append_dev(div6, div4);
    			append_dev(div6, t11);
    			append_dev(div6, div5);
    			append_dev(div5, span3);
    			append_dev(div5, t13);
    			append_dev(div5, span4);
    			append_dev(span4, t14);
    			append_dev(div7, t15);
    			append_dev(div7, form);
    			append_dev(form, button1);
    			append_dev(form, t17);
    			append_dev(form, span5);
    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(
    						button0,
    						"click",
    						function () {
    							if (is_function(/*closeDrawer*/ ctx[0])) /*closeDrawer*/ ctx[0].apply(this, arguments);
    						},
    						false,
    						false,
    						false
    					),
    					listen_dev(form, "submit", goToCheckout, false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if ((!current || dirty & /*cartList*/ 2) && t2_value !== (t2_value = /*cartList*/ ctx[1].length + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*cartList, incrementItem, decrementItem, removeItem*/ 114) {
    				each_value = /*cartList*/ ctx[1];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div2, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if ((!current || dirty & /*subTotal*/ 4) && t9_value !== (t9_value = `$${/*subTotal*/ ctx[2].toFixed(2)}` + "")) set_data_dev(t9, t9_value);
    			if ((!current || dirty & /*total*/ 8) && t14_value !== (t14_value = `$${/*total*/ ctx[3].toFixed(2)}` + "")) set_data_dev(t14, t14_value);

    			if (dirty & /*cartList*/ 2) {
    				toggle_class(div7, "displayHide", /*cartList*/ ctx[1].length === 0);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			if (detaching) detach_dev(t5);
    			if (detaching) detach_dev(div8);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].d();
    			}

    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const HOSTNAME$1 = "https://live.linespeedapt.com";

    function toggleLoading(id, state) {
    	const domEls = Array.from(document.querySelectorAll(".cart-product-card"));

    	for (let i = 0; i < domEls.length; i++) {
    		if (domEls[i].getAttribute("data-loading-id") === String(id)) {
    			if (state === "start") {
    				domEls[i].classList.add("loading");
    				return;
    			}

    			domEls[i].classList.remove("loading");
    			return;
    		}
    	}
    }

    function getCookie(cname) {
    	let name = cname + "=";
    	let decodedCookie = decodeURIComponent(document.cookie);
    	let ca = decodedCookie.split(";");

    	for (let i = 0; i < ca.length; i++) {
    		let c = ca[i];

    		while (c.charAt(0) == " ") {
    			c = c.substring(1);
    		}

    		if (c.indexOf(name) == 0) {
    			return c.substring(name.length, c.length);
    		}
    	}

    	return "";
    }

    function goToCheckout(e) {
    	e.preventDefault();
    	const c = encodeURIComponent(getCookie("angel"));
    	window.location.href = `${HOSTNAME$1}/checkout/?s=${c}`;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let subTotal;
    	let total;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CartContent', slots, []);
    	let { closeDrawer } = $$props;
    	let { cartList } = $$props;
    	let { cartOps } = $$props;
    	const backdrop = document.getElementById("cart-drawer").children[0];

    	backdrop.addEventListener("click", () => {
    		closeDrawer();
    	});

    	//Add all these 3 functions to Product Object
    	const incrementItem = id => {
    		toggleLoading(id, "start");

    		cartOps({
    			id,
    			type: "add",
    			onCompletion: () => {
    				toggleLoading(id, "stop");
    			}
    		}); //Server side logic will increment if product already in cart.
    	};

    	const decrementItem = id => {
    		toggleLoading(id, "start");

    		cartOps({
    			id,
    			type: "decrement",
    			onCompletion: () => {
    				toggleLoading(id, "stop");
    			}
    		});
    	};

    	const removeItem = id => {
    		toggleLoading(id, "start");

    		cartOps({
    			id,
    			type: "remove",
    			onCompletion: () => {
    				toggleLoading(id, "stop");
    			}
    		});
    	};

    	const writable_props = ['closeDrawer', 'cartList', 'cartOps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<CartContent> was created with unknown prop '${key}'`);
    	});

    	const func = product => incrementItem(product.id);
    	const func_1 = product => decrementItem(product.id);

    	$$self.$$set = $$props => {
    		if ('closeDrawer' in $$props) $$invalidate(0, closeDrawer = $$props.closeDrawer);
    		if ('cartList' in $$props) $$invalidate(1, cartList = $$props.cartList);
    		if ('cartOps' in $$props) $$invalidate(7, cartOps = $$props.cartOps);
    	};

    	$$self.$capture_state = () => ({
    		closeDrawer,
    		cartList,
    		cartOps,
    		CartProduct: CartProductCard,
    		HOSTNAME: HOSTNAME$1,
    		toggleLoading,
    		getCookie,
    		goToCheckout,
    		backdrop,
    		incrementItem,
    		decrementItem,
    		removeItem,
    		subTotal,
    		total
    	});

    	$$self.$inject_state = $$props => {
    		if ('closeDrawer' in $$props) $$invalidate(0, closeDrawer = $$props.closeDrawer);
    		if ('cartList' in $$props) $$invalidate(1, cartList = $$props.cartList);
    		if ('cartOps' in $$props) $$invalidate(7, cartOps = $$props.cartOps);
    		if ('subTotal' in $$props) $$invalidate(2, subTotal = $$props.subTotal);
    		if ('total' in $$props) $$invalidate(3, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*cartList*/ 2) {
    			$$invalidate(2, subTotal = cartList.reduce(
    				(previous, current) => {
    					return previous + current.fee * current.count;
    				},
    				0
    			));
    		}

    		if ($$self.$$.dirty & /*subTotal*/ 4) {
    			//Reserved. Might be usefull if discounts are available.
    			$$invalidate(3, total = subTotal);
    		}
    	};

    	return [
    		closeDrawer,
    		cartList,
    		subTotal,
    		total,
    		incrementItem,
    		decrementItem,
    		removeItem,
    		cartOps,
    		func,
    		func_1
    	];
    }

    class CartContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { closeDrawer: 0, cartList: 1, cartOps: 7 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CartContent",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*closeDrawer*/ ctx[0] === undefined && !('closeDrawer' in props)) {
    			console.warn("<CartContent> was created without expected prop 'closeDrawer'");
    		}

    		if (/*cartList*/ ctx[1] === undefined && !('cartList' in props)) {
    			console.warn("<CartContent> was created without expected prop 'cartList'");
    		}

    		if (/*cartOps*/ ctx[7] === undefined && !('cartOps' in props)) {
    			console.warn("<CartContent> was created without expected prop 'cartOps'");
    		}
    	}

    	get closeDrawer() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeDrawer(value) {
    		throw new Error("<CartContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cartList() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cartList(value) {
    		throw new Error("<CartContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cartOps() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cartOps(value) {
    		throw new Error("<CartContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/cartDrawer.svelte generated by Svelte v3.44.1 */

    const { console: console_1 } = globals;
    const file = "src/components/cartDrawer.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let cartcontent;
    	let current;

    	cartcontent = new CartContent({
    			props: {
    				cartOps: /*cartOps*/ ctx[2],
    				cartList: /*cartList*/ ctx[0],
    				closeDrawer: /*closeDrawer*/ ctx[3]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(cartcontent.$$.fragment);
    			attr_dev(div, "class", "cart-paper svelte-gevnv0");
    			toggle_class(div, "open", /*isOpen*/ ctx[1] === true);
    			add_location(div, file, 246, 0, 7061);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			mount_component(cartcontent, div, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const cartcontent_changes = {};
    			if (dirty & /*cartList*/ 1) cartcontent_changes.cartList = /*cartList*/ ctx[0];
    			cartcontent.$set(cartcontent_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cartcontent.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cartcontent.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_component(cartcontent);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    const HOSTNAME = "https://live.linespeedapt.com";

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('CartDrawer', slots, []);
    	let isOpen = false;

    	//Represent the location of flyer like products
    	//Will be used for merch
    	const PRODUCTSLOCATION = [];

    	//Represent the location of session products. Differet UI as flyer products
    	//The different UI means different targeting and loading state appearance
    	//The cart itself represents all cart products in the same vein.
    	const SESSIONLOCATION = [/^\/training\/.*$/];

    	const pageUrl = new URL(window.location.href);

    	const serverLog = message => {
    		fetch(`${HOSTNAME}:4000/graphql`, {
    			method: "POST",
    			headers: {
    				"Content-Type": "application/json",
    				Accept: "application/json"
    			},
    			credentials: "include",
    			body: JSON.stringify({
    				query: `mutation Log($message: String!){ log(message:$message)}`,
    				variables: { message }
    			})
    		});
    	};

    	let cartList = [];

    	const cartQuery = ({ onCompletion = null } = {}) => {
    		const start = new Date().getTime();

    		fetch(`${HOSTNAME}:4000/graphql`, {
    			method: "POST",
    			headers: {
    				"Content-Type": "application/json",
    				Accept: "application/json"
    			},
    			credentials: "include",
    			body: JSON.stringify({
    				query: `query Cart { cart {
          list{
            id
            name
            attributes
            description
            image
            fee
            count
          }
        }}`
    			})
    		}).then(r => {
    			const elapsed = new Date().getTime() - start;
    			serverLog(`Network Request to DataServer from CLient Side took: ${elapsed}ms`);
    			return r.json();
    		}).then(data => {
    			if (data && data.data && typeof data.data.cart === "object" && typeof data.data.cart.list === "object") {
    				$$invalidate(0, cartList = data.data.cart.list);
    				return;
    			}

    			if (data && data.data && typeof data.data.cart === "object") {
    				console.log("Cart List not object? Returned data: ", data);

    				//No such product?!?!
    				return;
    			}

    			//Something wrong with data
    			console.log("Something wrong with db? Returned data: ", data);
    		}).catch(e => {
    			console.log(e);
    			return;
    		}).finally(() => {
    			if (onCompletion !== null) {
    				onCompletion();
    				return;
    			}
    		});
    	};

    	cartQuery(); //Fetch cart saved on server if there is any

    	const cartOps = ({ id, type, reject = null, resolve = null, onCompletion = null, signal = null }) => {
    		const start = new Date().getTime();

    		fetch(`${HOSTNAME}:4000/graphql`, {
    			method: "POST",
    			headers: {
    				"Content-Type": "application/json",
    				Accept: "application/json"
    			},
    			credentials: "include",
    			body: JSON.stringify({
    				query: `mutation CartOperations($input: CartOperationsInput!) { cartOperations(input:$input) {
          list{
            id
            name
            attributes
            description
            image
            fee
            count
          }
        }}`,
    				variables: { input: { id, type } }
    			}),
    			signal
    		}).then(r => {
    			const elapsed = new Date().getTime() - start;
    			serverLog(`Network Request to DataServer from CLient Side took: ${elapsed}ms`);
    			return r.json();
    		}).then(data => {
    			if (data && data.data && typeof data.data.cartOperations === "object" && typeof data.data.cartOperations.list === "object") {
    				$$invalidate(0, cartList = data.data.cartOperations.list);
    				return;
    			}

    			if (data && data.data && typeof data.data.cartOperations === "object") {
    				console.log("Cart List not object? Returned data: ", data);

    				//No such product?!?!
    				return;
    			}

    			//Something wrong with data
    			console.log("Something wrong with db? Returned data: ", data);
    		}).catch(e => {
    			console.log(e);
    			return;
    		}).finally(() => {
    			if (onCompletion !== null) {
    				onCompletion();
    				return;
    			}
    		});
    	};

    	const openDrawer = () => {
    		document.getElementById("cart-drawer").classList.add("open");
    	};

    	const closeDrawer = () => {
    		document.getElementById("cart-drawer").classList.remove("open");
    	};

    	document.getElementById("cartIcon").addEventListener("click", () => {
    		openDrawer();
    	});

    	//Expects two dom elements
    	//An element onto which a 'loading' class is added/removed depending on state
    	//A button that is disabled/enabled depending on state
    	const loadingCart = (id, state, productEl, productBtn) => {
    		switch (state) {
    			case "start":
    				productEl.classList.add("loading");
    				productBtn.setAttribute("disabled", "true");
    				return;
    			case "stop":
    				productEl.classList.remove("loading");
    				productBtn.removeAttribute("disabled");
    				return;
    			default:
    				console.log("loadingCart expected 'state' parameter to be one of 'start' or 'stop'. Instead state is: ", state);
    				break;
    		}
    	};

    	//put loaders onto products
    	if (PRODUCTSLOCATION.some(location => pageUrl.pathname.match(location))) {
    		//Lets load the products that are displayed on the page
    		//Needed so that they can be target by loading indicators
    		const domProducts = Array.from(document.querySelectorAll(".session-product-container"));

    		domProducts.forEach(productEl => {
    			productEl.querySelector(".content-actions .btn").addEventListener("click", e => {
    				const id = e.target.getAttribute("data-id"); //the Add To Cart button
    				loadingCart(id, "start", productEl, e.target);

    				cartOps({
    					id,
    					type: "add",
    					onCompletion: () => {
    						loadingCart(id, "stop", productEl, e.target);
    						openDrawer();
    					}
    				});
    			});
    		});
    	}

    	//Put loaders onto action buttons for sessions
    	if (SESSIONLOCATION.some(location => pageUrl.pathname.match(location))) {
    		console.log("Page pathname matches target pages with sessions");
    		const domProducts = Array.from(document.querySelectorAll(".session-button-container"));

    		domProducts.forEach(productEl => {
    			productEl.querySelector(".btn").addEventListener("click", e => {
    				const id = e.target.getAttribute("data-id"); //the Add To Cart button
    				loadingCart(id, "start", productEl, e.target);

    				cartOps({
    					id,
    					type: "add",
    					onCompletion: () => {
    						loadingCart(id, "stop", productEl, e.target);
    						openDrawer();
    					}
    				});
    			});
    		});
    	}

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<CartDrawer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CartContent,
    		HOSTNAME,
    		isOpen,
    		PRODUCTSLOCATION,
    		SESSIONLOCATION,
    		pageUrl,
    		serverLog,
    		cartList,
    		cartQuery,
    		cartOps,
    		openDrawer,
    		closeDrawer,
    		loadingCart
    	});

    	$$self.$inject_state = $$props => {
    		if ('isOpen' in $$props) $$invalidate(1, isOpen = $$props.isOpen);
    		if ('cartList' in $$props) $$invalidate(0, cartList = $$props.cartList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cartList, isOpen, cartOps, closeDrawer];
    }

    class CartDrawer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CartDrawer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/App.svelte generated by Svelte v3.44.1 */

    function create_fragment(ctx) {
    	let cart;
    	let current;
    	cart = new CartDrawer({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(cart.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(cart, target, anchor);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cart.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cart.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(cart, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Cart: CartDrawer });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.querySelector("#cart-drawer"),
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=svelte-bundle.js.map
