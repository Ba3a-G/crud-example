const users = [
	{
		id: 1,
		name: 'Aryan',
		email: 'mail@gmail.com',
	},
	{
		id: 2,
		name: 'John',
		email: 'someMail@gmail.com',
	},
];

addEventListener('fetch', (event) => {
	event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
	const { pathname } = new URL(request.url);
	if (pathname.startsWith('/users')) {
		if (request.method === 'GET') {
			return getUsers();
		} else if (request.method === 'POST') {
			return createUser(request);
		} else if (request.method === 'PUT') {
			return updateUser(request);
		} else if (request.method === 'DELETE') {
			return deleteUser(pathname);
		}
	} else {
		return new Response(
			"A simple CRUD API example made by Ba3a for an article demonstration.\nhttps://github.com/ba3a-g/crud-example\n",
			{ status: 200 }
		);
	}
}

async function getUsers() {
	return new Response(JSON.stringify(users), {
		headers: { 'content-type': 'application/json' },
	});
}

async function createUser(request) {
	const data = await request.json();
	if (!data.name || !data.email) {
		return new Response('Name and email are required', { status: 400 });
	}
	const newUser = {
		id: users.length + 1,
		name: data.name,
		email: data.email,
	};
	users.push(newUser);
	return new Response(JSON.stringify(newUser), {
		headers: { 'content-type': 'application/json' },
	});
}

async function updateUser(request) {
	const data = await request.json();
	const user = users.find((user) => user.id === data.id);
	if (!user) {
		return new Response('User not found', { status: 404 });
	}
	user.name = data.name;
	user.email = data.email;
	return new Response(JSON.stringify(user), {
		headers: { 'content-type': 'application/json' },
	});
}

async function deleteUser(pathname) {
	const id = pathname.split('/')[2];
	const index = users.findIndex((user) => user.id === Number(id));
	if (index === -1) {
		return new Response('User not found', { status: 404 });
	}
	users.splice(index, 1);
	return new Response('User deleted', { status: 200 });
}
