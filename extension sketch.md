```ts
// ------- base library --------

const createDeferred = () => {
	let result, reject
	const promise = new Promise(($resolve,$reject) => {
		resolve = resolve
		reject = reject
	})
	return {
		promise,
		resolve,
		reject
	}
}

// ------- system --------

const hookNamesOrderedBySequence = ['request', 'fetch']

const hookIndexes = {
	request: 0,
	fetch: 1,
}

const getFirstHook = () => hookNamesOrderedBySequence[0]

const getNextHook = (hookName) => hookNamesOrderedBySequence[hookIndexes[hookName]+1] ?? null

const core = {
	hooks: {
		request: (input) => {},
		fetch: (input) => {},
	}
}



const runHook = ({ core, name, done, originalInput, currentHookStack, nextHookStack }) => {
	const [pausedExtension, ...nextCurrentHookStack] = currentHookStack
	
	// Going down the stack
	// --------------------

	if (pausedExtension) {
		// The extension is responsible for calling the next hook.
		const hook = withOriginalInput(originalInput, (nextOriginalInput) => {
			// Once called, the extension is paused again and we continue down the current hook stack.

			const pausedExtension = createDeferred()
			const nextNextHookStack = [...nextHookStack, pausedExtension] // tempting to mutate here but simpler to think about as copy.

			runHook({
				core,
				name,
				done,
				originalInput: nextOriginalInput,
				currentHookStack: nextCurrentHookStack,
				nextHookStack: nextNextHookStack,
			})

			return pausedExtension.promise
		})

		
		// The extension is resumed. It is responsible for calling the next hook.

		const envelope = { [name]: hook }
		pausedExtension.resolve(envelope)

		return 
	} 
	
	// Reached bottom of the stack
	// ---------------------------

	// Run core to get result
	
	const implementation = core.hooks[name]
	const result = await implementation(originalInput)

	// Return to root with the next result and hook stack

	done({ result, nextHookStack })

	return
}



const run = ({ core, initialInput, initialHookStack }) => {
	let currentInput = initialInput
	let currentHookStack = initialHookStack

	for (hookName of hookNamesOrderedBySequence) {
		const doneDeferred = createDeferred()
		runHook({
			core,
			name: hookName,
			done: doneDeferred.resolve,
			originalInput: currentInput,
			currentHookStack, 
			nextHookStack: [],
		})
		const { result, nextHookStack } = await doneDeferred.promise
		currentInput = result
		currentHookStack = nextHookStack
	}

	return currentInput // last loop result
}



const runExtensions = (extensions) => {
	return await run({
		core,
		{}, // first hook input 
		extensions.map(fn => {
			const deferred = createDeferred()
			deferred.promise.then(fn)
			return deferred.resolve
		})
	})
}



// ----- application -----



const extensionA = ({ request/*START*/ }) => {
	const { fetch }/*B2*/ = await request(request.input)/*A1*/
	const { value }/*D2*/ = await fetch(fetch.input)/*C1*/
	return value/*E1*/
}

const extensionB = ({ request/*A2*/ }) => {
	const { fetch }/*C2*/ = await request(request.input)/*B1*/
	const { value }/*E2*/ = await fetch(fetch.input)/*D1*/
	return value/*END*/
}

runExtensions([extensionA, extensionB])
```
