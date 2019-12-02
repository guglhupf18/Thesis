"use strict";
var TestTextured;
(function (TestTextured) {
    var tl = TestLib;
    let gl;
    let renderInfos = [];
    let shaderInfos = [];
    window.addEventListener("load", init);
    function init(_event) {
        const canvas = utils.getCanvas("webgl-canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        gl = utils.getGLContext(canvas);
        // gl.enable(WebGL2RenderingContext.CULL_FACE);
        // gl.frontFace(WebGL2RenderingContext.CW);
        gl.clearColor(0, 0, 0, 1);
        addProgram(tl.shader.vertexSimple, tl.shader.fragmentYellow);
        addProgram(tl.shader.vertexSimple, tl.shader.fragmentRed);
        addProgram(tl.shader.vertexColor, tl.shader.fragmentColor);
        addProgram(tl.shader.vertexTexture, tl.shader.fragmentTexure);
        let images = document.querySelectorAll("img");
        let mtrTexture = [];
        for (let image of images)
            mtrTexture.push(new tl.MaterialTexture(image));
        createRenderInfo(tl.square, shaderInfos[0], null);
        createRenderInfo(tl.triangle, shaderInfos[3], mtrTexture[1]);
        createRenderInfo(tl.penta, shaderInfos[3], mtrTexture[2]);
        createRenderInfo(tl.hexa, shaderInfos[3], mtrTexture[0]);
        draw();
    }
    function addProgram(_vertex, _fragment) {
        const vertexShader = getShader(_vertex, gl.VERTEX_SHADER);
        const fragmentShader = getShader(_fragment, gl.FRAGMENT_SHADER);
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Could not initialize shaders");
        }
        let shaderInfo = {
            program: program,
            attributes: detectAttributes(program),
            uniforms: detectUniforms(program)
        };
        shaderInfos.push(shaderInfo);
    }
    function detectAttributes(_program) {
        let detectedAttributes = {};
        let attributeCount = gl.getProgramParameter(_program, WebGL2RenderingContext.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; i++) {
            let attributeInfo = gl.getActiveAttrib(_program, i);
            if (!attributeInfo) {
                break;
            }
            detectedAttributes[attributeInfo.name] = gl.getAttribLocation(_program, attributeInfo.name);
        }
        return detectedAttributes;
    }
    function detectUniforms(_program) {
        let detectedUniforms = {};
        let uniformCount = gl.getProgramParameter(_program, WebGL2RenderingContext.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            let info = gl.getActiveUniform(_program, i);
            if (!info) {
                break;
            }
            detectedUniforms[info.name] = gl.getUniformLocation(_program, info.name);
        }
        return detectedUniforms;
    }
    function getShader(_source, type) {
        let shader;
        shader = gl.createShader(type);
        gl.shaderSource(shader, _source);
        gl.compileShader(shader);
        // TODO: include validation in FUDGE
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    }
    function createRenderInfo(_mesh, _shaderInfo, _material) {
        let vao = gl.createVertexArray();
        gl.bindVertexArray(vao);
        // Setting up the VBO
        let vertexBuffer = gl.createBuffer();
        gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(WebGL2RenderingContext.ARRAY_BUFFER, new Float32Array(_mesh.vertices), gl.STATIC_DRAW);
        // gl.enableVertexAttribArray(_shaderInfo.attributes["aVertexPosition"]);
        // gl.vertexAttribPointer(_shaderInfo.attributes["aVertexPosition"], 3, gl.FLOAT, false, 0, 0);
        // gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, null);
        // Setting up texture buffer
        let textureUVs = null;
        // if (_shaderInfo.attributes["aVertexTextureUVs"]) {
        // if (_material && _material.constructor.name == "MaterialTexture") {
        textureUVs = gl.createBuffer();
        gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, textureUVs);
        gl.bufferData(WebGL2RenderingContext.ARRAY_BUFFER, new Float32Array(_mesh.getTextureUVs()), WebGL2RenderingContext.STATIC_DRAW);
        // gl.enableVertexAttribArray(_shaderInfo.attributes["aVertexTextureUVs"]); // enable the buffer
        // gl.vertexAttribPointer(_shaderInfo.attributes["aVertexTextureUVs"], 2, gl.FLOAT, false, 0, 0); // set bufferspecs
        // }
        gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, null);
        // }
        // Setting up the IBO
        let indexBuffer = gl.createBuffer();
        gl.bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.bufferData(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, new Uint16Array(_mesh.indices), gl.STATIC_DRAW);
        // Clean
        gl.bindVertexArray(null);
        gl.bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, null);
        let renderInfo = { shaderInfo: _shaderInfo, vao: vao, material: _material };
        renderInfos.push(renderInfo);
        let renderMesh = { vertices: vertexBuffer, indices: indexBuffer, textureUVs: textureUVs, nIndices: _mesh.indices.length };
        renderInfo.renderMesh = renderMesh;
    }
    // We call draw to render to our canvas
    function draw() {
        // Clear the scene
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        for (let renderInfo of renderInfos) {
            gl.useProgram(renderInfo.shaderInfo.program);
            // gl.bindVertexArray(renderInfo.vao);
            // bind vertices
            gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, renderInfo.renderMesh.vertices);
            gl.enableVertexAttribArray(renderInfo.shaderInfo.attributes["aVertexPosition"]);
            gl.vertexAttribPointer(renderInfo.shaderInfo.attributes["aVertexPosition"], 3, gl.FLOAT, false, 0, 0);
            // bind indices
            gl.bindBuffer(WebGL2RenderingContext.ELEMENT_ARRAY_BUFFER, renderInfo.renderMesh.indices);
            // bind UVs
            if (renderInfo.shaderInfo.attributes["aVertexTextureUVs"]) {
                gl.bindBuffer(WebGL2RenderingContext.ARRAY_BUFFER, renderInfo.renderMesh.textureUVs);
                gl.enableVertexAttribArray(renderInfo.shaderInfo.attributes["aVertexTextureUVs"]); // enable the buffer
                gl.vertexAttribPointer(renderInfo.shaderInfo.attributes["aVertexTextureUVs"], 2, gl.FLOAT, false, 0, 0); // set bufferspecs
            }
            if (renderInfo.material)
                renderInfo.material.useRenderData(gl, renderInfo.shaderInfo);
            gl.drawElements(WebGL2RenderingContext.TRIANGLES, renderInfo.renderMesh.nIndices, gl.UNSIGNED_SHORT, 0);
        }
        // Clean
        gl.bindVertexArray(null);
    }
})(TestTextured || (TestTextured = {}));
//# sourceMappingURL=Main.js.map