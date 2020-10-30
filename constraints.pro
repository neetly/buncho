package_name(WorkspaceCwd, PackageName) :-
  workspace_ident(WorkspaceCwd, WorkspaceIdent),
  atom_concat('@buncho/', PackageName, WorkspaceIdent),
  WorkspaceIdent \= '@buncho/workspace'.

gen_enforced_field(WorkspaceCwd, 'homepage', 'https://github.com/BunchoDev/buncho').
gen_enforced_field(WorkspaceCwd, 'repository.type', 'git').
gen_enforced_field(WorkspaceCwd, 'repository.url', 'git@github.com:BunchoDev/buncho.git').
gen_enforced_field(WorkspaceCwd, 'repository.directory', FieldValue) :-
  package_name(WorkspaceCwd, PackageName),
  atom_concat('packages/', PackageName, FieldValue).
gen_enforced_field(WorkspaceCwd, 'license', 'MIT').

gen_enforced_field(WorkspaceCwd, 'scripts.build', FieldValue) :-
  package_name(WorkspaceCwd, PackageName),
  atom_concat('run pkg:build ', PackageName, FieldValue).
gen_enforced_field(WorkspaceCwd, 'scripts.clean', FieldValue) :-
  package_name(WorkspaceCwd, PackageName),
  atom_concat('run pkg:clean ', PackageName, FieldValue).
gen_enforced_field(WorkspaceCwd, 'scripts.prepack', 'run clean && run build && cp ../../LICENSE .') :-
  package_name(WorkspaceCwd, _).

gen_enforced_dependency(WorkspaceCwd, DependencyIdent, DependencyRange2, DependencyType) :-
  workspace_has_dependency(WorkspaceCwd, DependencyIdent, DependencyRange, DependencyType),
  workspace_has_dependency(_, DependencyIdent, DependencyRange2, DependencyType2),
  DependencyType \= 'peerDependencies',
  DependencyType2 \= 'peerDependencies'.
