const schemaStandards = {
	object: (value) => value,
	string: (value) => ({ type: value }),
};

const repoStandards = {
	object: ({ repo }) => repo,
	string: ({ repo, repoOptions }) => repoOptions[repo],
};

export default { repoStandards, schemaStandards };
