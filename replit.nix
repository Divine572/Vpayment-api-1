{ pkgs }: {
    deps = [
        pkgs.docker
        pkgs.docker
        pkgs.yarn
        pkgs.esbuild
        pkgs.nodejs-16_x

        pkgs.nodePackages.typescript
        pkgs.nodePackages.typescript-language-server
    ];
}