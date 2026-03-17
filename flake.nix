{
  description = "Sigtuna Bågskytteklubb website";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        # Libraries required for Chromium dynamic linking on NixOS
        chromiumLibs = with pkgs; [
          alsa-lib
          atk
          cairo
          cups
          dbus
          expat
          glib
          libdrm
          libxkbcommon
          mesa
          nspr
          nss
          pango
          xorg.libX11
          xorg.libXcomposite
          xorg.libXdamage
          xorg.libXext
          xorg.libXfixes
          xorg.libXrandr
          xorg.libxcb
        ];
      in {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_22
            chromium
          ];

          env = {
            # Tell Playwright to use the system Chromium instead of downloading its own
            PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD = "1";
            PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH = "${pkgs.chromium}/bin/chromium";
          };

          shellHook = ''
            export LD_LIBRARY_PATH="${pkgs.lib.makeLibraryPath chromiumLibs}:''${LD_LIBRARY_PATH:-}"
            echo "sigtunabagskytt dev — node $(node --version)"
          '';
        };
      });
}
