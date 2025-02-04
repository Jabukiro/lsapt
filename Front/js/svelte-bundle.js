
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

    /* src/components/cartSession.svelte generated by Svelte v3.44.1 */

    const { console: console_1$2 } = globals;
    const file$2 = "src/components/cartSession.svelte";

    function create_fragment$3(ctx) {
    	let div10;
    	let div1;
    	let div0;
    	let h4;
    	let t0_value = /*cartSession*/ ctx[0].session.name + "";
    	let t0;
    	let t1;
    	let span0;
    	let t2;
    	let t3_value = /*cartSession*/ ctx[0].athleteList.length + "";
    	let t3;
    	let t4;
    	let button;
    	let span1;
    	let button_id_value;
    	let t6;
    	let div5;
    	let div2;
    	let img;
    	let img_src_value;
    	let t7;
    	let div4;
    	let p;
    	let raw_value = `${/*cartSession*/ ctx[0].session.attributes}<br>${/*cartSession*/ ctx[0].session.description}` + "";
    	let t8;
    	let div3;
    	let span2;
    	let t9_value = `$${(/*cartSession*/ ctx[0].session.fee * /*cartSession*/ ctx[0].athleteList.length).toFixed(2)}` + "";
    	let t9;
    	let t10;
    	let a;
    	let t11;
    	let a_href_value;
    	let t12;
    	let div9;
    	let div6;
    	let t13;
    	let div7;
    	let t14;
    	let div8;
    	let div10_data_loading_id_value;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div10 = element("div");
    			div1 = element("div");
    			div0 = element("div");
    			h4 = element("h4");
    			t0 = text(t0_value);
    			t1 = space();
    			span0 = element("span");
    			t2 = text("x");
    			t3 = text(t3_value);
    			t4 = space();
    			button = element("button");
    			span1 = element("span");
    			span1.textContent = "Remove";
    			t6 = space();
    			div5 = element("div");
    			div2 = element("div");
    			img = element("img");
    			t7 = space();
    			div4 = element("div");
    			p = element("p");
    			t8 = space();
    			div3 = element("div");
    			span2 = element("span");
    			t9 = text(t9_value);
    			t10 = space();
    			a = element("a");
    			t11 = text("Add Athlete");
    			t12 = space();
    			div9 = element("div");
    			div6 = element("div");
    			t13 = space();
    			div7 = element("div");
    			t14 = space();
    			div8 = element("div");
    			attr_dev(h4, "class", "h5");
    			set_style(h4, "display", "inline");
    			add_location(h4, file$2, 9, 6, 314);
    			attr_dev(span0, "class", "small-font");
    			set_style(span0, "color", "var(--main-color)");
    			add_location(span0, file$2, 10, 6, 391);
    			add_location(div0, file$2, 8, 4, 302);
    			attr_dev(span1, "aria-hidden", "true");
    			add_location(span1, file$2, 21, 6, 727);
    			attr_dev(button, "id", button_id_value = "removeItemBtn" + /*cartSession*/ ctx[0].session.id);
    			attr_dev(button, "type", "button");
    			attr_dev(button, "class", "close small-font");
    			attr_dev(button, "aria-label", "Remove product");
    			add_location(button, file$2, 14, 4, 521);
    			attr_dev(div1, "class", "cart-product-card-header d-flex flex-row justify-content-between");
    			add_location(div1, file$2, 7, 2, 219);
    			if (!src_url_equal(img.src, img_src_value = /*cartSession*/ ctx[0].session.image)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "Product");
    			set_style(img, "width", "inherit");
    			add_location(img, file$2, 26, 6, 893);
    			attr_dev(div2, "class", "round-image-container");
    			add_location(div2, file$2, 25, 4, 851);
    			add_location(p, file$2, 33, 6, 1061);
    			attr_dev(span2, "class", "small-font font-weight-bold");
    			add_location(span2, file$2, 37, 8, 1219);
    			attr_dev(a, "class", "btn btn-link btn-sm");
    			attr_dev(a, "type", "button");
    			attr_dev(a, "href", a_href_value = /*cartSession*/ ctx[0].session.href);
    			add_location(a, file$2, 42, 8, 1398);
    			attr_dev(div3, "class", "cart-product-card-bottom");
    			add_location(div3, file$2, 36, 6, 1172);
    			attr_dev(div4, "class", "cart-product-description");
    			add_location(div4, file$2, 32, 4, 1016);
    			attr_dev(div5, "class", "cart-product-card-content d-flex flex-row");
    			add_location(div5, file$2, 24, 2, 791);
    			attr_dev(div6, "class", "line");
    			add_location(div6, file$2, 51, 4, 1630);
    			attr_dev(div7, "class", "subline inc");
    			add_location(div7, file$2, 52, 4, 1655);
    			attr_dev(div8, "class", "subline dec");
    			add_location(div8, file$2, 53, 4, 1687);
    			attr_dev(div9, "id", "storeCreationLoading");
    			attr_dev(div9, "class", "angel-linear-loading");
    			add_location(div9, file$2, 50, 2, 1565);
    			attr_dev(div10, "class", "cart-product-card");
    			attr_dev(div10, "data-loading-id", div10_data_loading_id_value = /*cartSession*/ ctx[0].session.id);
    			add_location(div10, file$2, 6, 0, 144);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div10, anchor);
    			append_dev(div10, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h4);
    			append_dev(h4, t0);
    			append_dev(div0, t1);
    			append_dev(div0, span0);
    			append_dev(span0, t2);
    			append_dev(span0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, button);
    			append_dev(button, span1);
    			append_dev(div10, t6);
    			append_dev(div10, div5);
    			append_dev(div5, div2);
    			append_dev(div2, img);
    			append_dev(div5, t7);
    			append_dev(div5, div4);
    			append_dev(div4, p);
    			p.innerHTML = raw_value;
    			append_dev(div4, t8);
    			append_dev(div4, div3);
    			append_dev(div3, span2);
    			append_dev(span2, t9);
    			append_dev(div3, t10);
    			append_dev(div3, a);
    			append_dev(a, t11);
    			append_dev(div10, t12);
    			append_dev(div10, div9);
    			append_dev(div9, div6);
    			append_dev(div9, t13);
    			append_dev(div9, div7);
    			append_dev(div9, t14);
    			append_dev(div9, div8);

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*removeItem*/ ctx[1](/*cartSession*/ ctx[0].session.id))) /*removeItem*/ ctx[1](/*cartSession*/ ctx[0].session.id).apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;
    			if (dirty & /*cartSession*/ 1 && t0_value !== (t0_value = /*cartSession*/ ctx[0].session.name + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*cartSession*/ 1 && t3_value !== (t3_value = /*cartSession*/ ctx[0].athleteList.length + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*cartSession*/ 1 && button_id_value !== (button_id_value = "removeItemBtn" + /*cartSession*/ ctx[0].session.id)) {
    				attr_dev(button, "id", button_id_value);
    			}

    			if (dirty & /*cartSession*/ 1 && !src_url_equal(img.src, img_src_value = /*cartSession*/ ctx[0].session.image)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*cartSession*/ 1 && raw_value !== (raw_value = `${/*cartSession*/ ctx[0].session.attributes}<br>${/*cartSession*/ ctx[0].session.description}` + "")) p.innerHTML = raw_value;			if (dirty & /*cartSession*/ 1 && t9_value !== (t9_value = `$${(/*cartSession*/ ctx[0].session.fee * /*cartSession*/ ctx[0].athleteList.length).toFixed(2)}` + "")) set_data_dev(t9, t9_value);

    			if (dirty & /*cartSession*/ 1 && a_href_value !== (a_href_value = /*cartSession*/ ctx[0].session.href)) {
    				attr_dev(a, "href", a_href_value);
    			}

    			if (dirty & /*cartSession*/ 1 && div10_data_loading_id_value !== (div10_data_loading_id_value = /*cartSession*/ ctx[0].session.id)) {
    				attr_dev(div10, "data-loading-id", div10_data_loading_id_value);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div10);
    			mounted = false;
    			dispose();
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
    	validate_slots('CartSession', slots, []);
    	let { cartSession } = $$props;
    	let { removeItem } = $$props;
    	console.log("cartSession.svelte Provided cartSession: ", cartSession);
    	const writable_props = ['cartSession', 'removeItem'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<CartSession> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('cartSession' in $$props) $$invalidate(0, cartSession = $$props.cartSession);
    		if ('removeItem' in $$props) $$invalidate(1, removeItem = $$props.removeItem);
    	};

    	$$self.$capture_state = () => ({ cartSession, removeItem });

    	$$self.$inject_state = $$props => {
    		if ('cartSession' in $$props) $$invalidate(0, cartSession = $$props.cartSession);
    		if ('removeItem' in $$props) $$invalidate(1, removeItem = $$props.removeItem);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cartSession, removeItem];
    }

    class CartSession extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { cartSession: 0, removeItem: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CartSession",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*cartSession*/ ctx[0] === undefined && !('cartSession' in props)) {
    			console_1$2.warn("<CartSession> was created without expected prop 'cartSession'");
    		}

    		if (/*removeItem*/ ctx[1] === undefined && !('removeItem' in props)) {
    			console_1$2.warn("<CartSession> was created without expected prop 'removeItem'");
    		}
    	}

    	get cartSession() {
    		throw new Error("<CartSession>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cartSession(value) {
    		throw new Error("<CartSession>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get removeItem() {
    		throw new Error("<CartSession>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set removeItem(value) {
    		throw new Error("<CartSession>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/cartContent.svelte generated by Svelte v3.44.1 */

    const { console: console_1$1 } = globals;
    const file$1 = "src/components/cartContent.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[12] = list[i];
    	return child_ctx;
    }

    // (131:4) {#each cartSessionsList as cartSession (cartSession.session.id)}
    function create_each_block(key_1, ctx) {
    	let first;
    	let cartsession;
    	let current;

    	cartsession = new CartSession({
    			props: {
    				cartSession: /*cartSession*/ ctx[12],
    				removeItem: /*removeSessionItem*/ ctx[5]
    			},
    			$$inline: true
    		});

    	const block = {
    		key: key_1,
    		first: null,
    		c: function create() {
    			first = empty();
    			create_component(cartsession.$$.fragment);
    			this.first = first;
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, first, anchor);
    			mount_component(cartsession, target, anchor);
    			current = true;
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;
    			const cartsession_changes = {};
    			if (dirty & /*cartSessionsList*/ 4) cartsession_changes.cartSession = /*cartSession*/ ctx[12];
    			cartsession.$set(cartsession_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(cartsession.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(cartsession.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(first);
    			destroy_component(cartsession, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(131:4) {#each cartSessionsList as cartSession (cartSession.session.id)}",
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
    	let t2_value = /*cartProductList*/ ctx[1].length + "";
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
    	let t9_value = `$${/*subTotal*/ ctx[3].toFixed(2)}` + "";
    	let t9;
    	let t10;
    	let div4;
    	let t11;
    	let div5;
    	let span3;
    	let t13;
    	let span4;
    	let t14_value = `$${/*total*/ ctx[4].toFixed(2)}` + "";
    	let t14;
    	let t15;
    	let form;
    	let button1;
    	let t17;
    	let span5;
    	let current;
    	let mounted;
    	let dispose;
    	let each_value = /*cartSessionsList*/ ctx[2];
    	validate_each_argument(each_value);
    	const get_key = ctx => /*cartSession*/ ctx[12].session.id;
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
    			add_location(h2, file$1, 116, 4, 3169);
    			attr_dev(label, "for", "cart-drawer");
    			attr_dev(label, "class", "small-font");
    			add_location(label, file$1, 117, 4, 3207);
    			attr_dev(div0, "class", "cart-header-main");
    			add_location(div0, file$1, 115, 2, 3134);
    			attr_dev(span0, "aria-hidden", "true");
    			add_location(span0, file$1, 125, 4, 3402);
    			attr_dev(button0, "type", "button");
    			attr_dev(button0, "class", "close");
    			attr_dev(button0, "aria-label", "Close Cart");
    			add_location(button0, file$1, 119, 2, 3295);
    			attr_dev(div1, "class", "cart-header");
    			add_location(div1, file$1, 114, 0, 3106);
    			attr_dev(div2, "class", "mb-5 cart-body");
    			add_location(div2, file$1, 129, 2, 3495);
    			attr_dev(span1, "class", "font-weight-bold text-uppercase");
    			add_location(span1, file$1, 142, 8, 3959);
    			attr_dev(span2, "class", "font-weight-bold");
    			add_location(span2, file$1, 143, 8, 4030);
    			attr_dev(div3, "class", "cart-checkout-subtotals d-flex flex-row justify-content-between small-font");
    			add_location(div3, file$1, 139, 6, 3847);
    			attr_dev(div4, "class", "horizontal-divider");
    			set_style(div4, "margin", "0.5rem 0");
    			add_location(div4, file$1, 145, 6, 4115);
    			attr_dev(span3, "class", "font-weight-bold text-uppercase");
    			add_location(span3, file$1, 149, 8, 4289);
    			attr_dev(span4, "class", "font-weight-bold");
    			add_location(span4, file$1, 150, 8, 4357);
    			attr_dev(div5, "class", "cart-checkout-estimated-totals d-flex flex-row justify-content-between");
    			add_location(div5, file$1, 146, 6, 4181);
    			attr_dev(div6, "class", "cart-checkout-totals mb-3");
    			add_location(div6, file$1, 138, 4, 3801);
    			attr_dev(button1, "type", "submit");
    			attr_dev(button1, "class", "btn btn-dark btn-accent mb-2");
    			add_location(button1, file$1, 158, 6, 4596);
    			attr_dev(span5, "class", "cart-checkout-info");
    			add_location(span5, file$1, 161, 6, 4706);
    			attr_dev(form, "action", "/checkout");
    			attr_dev(form, "class", "cart-checkout-proceed d-flex flex-column align-items-center");
    			add_location(form, file$1, 153, 4, 4448);
    			attr_dev(div7, "class", "cart-checkout svelte-i88o4s");
    			toggle_class(div7, "displayHide", /*cartSessionsList*/ ctx[2].length + /*cartProductList*/ ctx[1].length === 0);
    			add_location(div7, file$1, 134, 2, 3683);
    			attr_dev(div8, "class", "cart-body-wrapper");
    			add_location(div8, file$1, 128, 0, 3461);
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
    			if ((!current || dirty & /*cartProductList*/ 2) && t2_value !== (t2_value = /*cartProductList*/ ctx[1].length + "")) set_data_dev(t2, t2_value);

    			if (dirty & /*cartSessionsList, removeSessionItem*/ 36) {
    				each_value = /*cartSessionsList*/ ctx[2];
    				validate_each_argument(each_value);
    				group_outros();
    				validate_each_keys(ctx, each_value, get_each_context, get_key);
    				each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx, each_value, each_1_lookup, div2, outro_and_destroy_block, create_each_block, null, get_each_context);
    				check_outros();
    			}

    			if ((!current || dirty & /*subTotal*/ 8) && t9_value !== (t9_value = `$${/*subTotal*/ ctx[3].toFixed(2)}` + "")) set_data_dev(t9, t9_value);
    			if ((!current || dirty & /*total*/ 16) && t14_value !== (t14_value = `$${/*total*/ ctx[4].toFixed(2)}` + "")) set_data_dev(t14, t14_value);

    			if (dirty & /*cartSessionsList, cartProductList*/ 6) {
    				toggle_class(div7, "displayHide", /*cartSessionsList*/ ctx[2].length + /*cartProductList*/ ctx[1].length === 0);
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

    const HOSTNAME$1 = "https://lapt.localhost";

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
    	let { cartProductList } = $$props;
    	let { cartSessionsList } = $$props;
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

    	const removeSessionItem = id => {
    		toggleLoading(id, "start");

    		cartOps({
    			id,
    			type: "removeSession",
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

    	function calcSubtotal() {
    		console.log("cartSessionsList", cartSessionsList);

    		const productsCost = cartProductList.length > 0
    		? cartProductList.reduce(
    				(previous, current) => {
    					return previous + current.fee * current.count;
    				},
    				0
    			)
    		: 0;

    		const sessionsCost = cartSessionsList.length > 0
    		? cartSessionsList.reduce(
    				(previous, current) => {
    					return previous + current.session.fee * current.athleteList.length;
    				},
    				0
    			)
    		: 0;

    		return productsCost + sessionsCost;
    	}

    	const writable_props = ['closeDrawer', 'cartProductList', 'cartSessionsList', 'cartOps'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<CartContent> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('closeDrawer' in $$props) $$invalidate(0, closeDrawer = $$props.closeDrawer);
    		if ('cartProductList' in $$props) $$invalidate(1, cartProductList = $$props.cartProductList);
    		if ('cartSessionsList' in $$props) $$invalidate(2, cartSessionsList = $$props.cartSessionsList);
    		if ('cartOps' in $$props) $$invalidate(6, cartOps = $$props.cartOps);
    	};

    	$$self.$capture_state = () => ({
    		closeDrawer,
    		cartProductList,
    		cartSessionsList,
    		cartOps,
    		CartSession,
    		HOSTNAME: HOSTNAME$1,
    		toggleLoading,
    		getCookie,
    		goToCheckout,
    		backdrop,
    		incrementItem,
    		decrementItem,
    		removeSessionItem,
    		removeItem,
    		calcSubtotal,
    		subTotal,
    		total
    	});

    	$$self.$inject_state = $$props => {
    		if ('closeDrawer' in $$props) $$invalidate(0, closeDrawer = $$props.closeDrawer);
    		if ('cartProductList' in $$props) $$invalidate(1, cartProductList = $$props.cartProductList);
    		if ('cartSessionsList' in $$props) $$invalidate(2, cartSessionsList = $$props.cartSessionsList);
    		if ('cartOps' in $$props) $$invalidate(6, cartOps = $$props.cartOps);
    		if ('subTotal' in $$props) $$invalidate(3, subTotal = $$props.subTotal);
    		if ('total' in $$props) $$invalidate(4, total = $$props.total);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*subTotal*/ 8) {
    			//Reserved. Might be usefull if discounts are available.
    			$$invalidate(4, total = subTotal);
    		}
    	};

    	$$invalidate(3, subTotal = calcSubtotal());

    	return [
    		closeDrawer,
    		cartProductList,
    		cartSessionsList,
    		subTotal,
    		total,
    		removeSessionItem,
    		cartOps
    	];
    }

    class CartContent extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			closeDrawer: 0,
    			cartProductList: 1,
    			cartSessionsList: 2,
    			cartOps: 6
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "CartContent",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*closeDrawer*/ ctx[0] === undefined && !('closeDrawer' in props)) {
    			console_1$1.warn("<CartContent> was created without expected prop 'closeDrawer'");
    		}

    		if (/*cartProductList*/ ctx[1] === undefined && !('cartProductList' in props)) {
    			console_1$1.warn("<CartContent> was created without expected prop 'cartProductList'");
    		}

    		if (/*cartSessionsList*/ ctx[2] === undefined && !('cartSessionsList' in props)) {
    			console_1$1.warn("<CartContent> was created without expected prop 'cartSessionsList'");
    		}

    		if (/*cartOps*/ ctx[6] === undefined && !('cartOps' in props)) {
    			console_1$1.warn("<CartContent> was created without expected prop 'cartOps'");
    		}
    	}

    	get closeDrawer() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set closeDrawer(value) {
    		throw new Error("<CartContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cartProductList() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cartProductList(value) {
    		throw new Error("<CartContent>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get cartSessionsList() {
    		throw new Error("<CartContent>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set cartSessionsList(value) {
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
    				cartOps: /*cartOps*/ ctx[3],
    				cartProductList: /*cartProductList*/ ctx[0],
    				cartSessionsList: /*cartSessionsList*/ ctx[1],
    				closeDrawer: /*closeDrawer*/ ctx[4]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div = element("div");
    			create_component(cartcontent.$$.fragment);
    			attr_dev(div, "class", "cart-paper svelte-gevnv0");
    			toggle_class(div, "open", /*isOpen*/ ctx[2] === true);
    			add_location(div, file, 304, 0, 8577);
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
    			if (dirty & /*cartProductList*/ 1) cartcontent_changes.cartProductList = /*cartProductList*/ ctx[0];
    			if (dirty & /*cartSessionsList*/ 2) cartcontent_changes.cartSessionsList = /*cartSessionsList*/ ctx[1];
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

    const HOSTNAME = "https://lapt.localhost";

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

    	let cartProductList = [];
    	let cartSessionsList = [];

    	// /js/regForm.js needs to read/write access to the cartSessionsList
    	window.setCartSessionsList = newCartSessionsList => {
    		$$invalidate(1, cartSessionsList = newCartSessionsList);
    	};

    	window.getCartSessionsList = () => cartSessionsList;

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
          registeredSessions{
            id
            session{
              id
              name
              description
              image
              attributes
              fee
              href
           }
            athleteList{
                full_name
            }
            guardianInfo{
              full_name
              email
              contact_number
              address
              alt_name
              alt_contact_number
            }
          }
        }}`
    			})
    		}).then(r => {
    			const elapsed = new Date().getTime() - start;
    			serverLog(`Network Request to DataServer from CLient Side took: ${elapsed}ms`);
    			return r.json();
    		}).then(data => {
    			if (data && data.data && typeof data.data.cart === "object" && typeof data.data.cart.list === "object") {
    				$$invalidate(0, cartProductList = data.data.cart.list);
    				$$invalidate(1, cartSessionsList = data.data.cart.registeredSessions);
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
          registeredSessions{
            id
            session{
              id
              name
              description
              image
              attributes
              fee
              href
           }
            athleteList{
                full_name
            }
            guardianInfo{
              full_name
              email
              contact_number
              address
              alt_name
              alt_contact_number
            }
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
    				console.log("cartOperations returned data: ", type, data);
    				$$invalidate(0, cartProductList = data.data.cartOperations.list);
    				$$invalidate(1, cartSessionsList = data.data.cartOperations.registeredSessions);
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

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<CartDrawer> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({
    		CartContent,
    		CartSession,
    		HOSTNAME,
    		isOpen,
    		PRODUCTSLOCATION,
    		SESSIONLOCATION,
    		pageUrl,
    		serverLog,
    		cartProductList,
    		cartSessionsList,
    		cartQuery,
    		cartOps,
    		openDrawer,
    		closeDrawer,
    		loadingCart
    	});

    	$$self.$inject_state = $$props => {
    		if ('isOpen' in $$props) $$invalidate(2, isOpen = $$props.isOpen);
    		if ('cartProductList' in $$props) $$invalidate(0, cartProductList = $$props.cartProductList);
    		if ('cartSessionsList' in $$props) $$invalidate(1, cartSessionsList = $$props.cartSessionsList);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [cartProductList, cartSessionsList, isOpen, cartOps, closeDrawer];
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
