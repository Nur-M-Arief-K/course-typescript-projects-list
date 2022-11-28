//autobind decorator
function AutoBind(target: any, methodName: string, descriptor: PropertyDescriptor) {
	const originalMethod = descriptor.value;
	const adjDescriptor: PropertyDescriptor = {
		configurable: true,

		//get function below to modify .value method, so the .value method is automatically binded
		get() {
			const boundFn = originalMethod.bind(this);
			return boundFn;
		},
	};
	console.log("descriptor: ", descriptor);
	console.log("origialMethod: ", originalMethod);
	console.log("adjDescriptor: ", adjDescriptor);
	return adjDescriptor;
};

// ProjectInput Class
class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;
	
	constructor() {
		this.templateElement = <HTMLTemplateElement> document.getElementById("project-input")! ;
		this.hostElement = <HTMLDivElement> document.getElementById("app")!

		const importedNode = document.importNode(this.templateElement.content, true);
		this.element = <HTMLFormElement> importedNode.firstElementChild;
		this.element.id = "user-input";
		
		this.titleInputElement = <HTMLInputElement> this.element.querySelector("#title");
		this.descriptionInputElement = <HTMLInputElement> this.element.querySelector("#description");
		this.peopleInputElement = <HTMLInputElement> this.element.querySelector("#people");

		this.configure();
		this.attach();
	};

	@AutoBind
	private submitHandler(event: Event) {
		event.preventDefault();
		console.log(this.titleInputElement.value);
	};


	private configure() {
		this.element.addEventListener("submit", this.submitHandler);
	};

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	};
};

const prjInput = new ProjectInput();
console.log(prjInput);