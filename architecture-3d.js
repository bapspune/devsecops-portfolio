/**
 * ============================================================
 * 3D DevSecOps Architecture Visualizer — devsecops411014.site
 * Senior DevSecOps Engineer & Cloud Architect: Suhas Phunde
 * Interactive WebGL / Three.js 3D Cloud & Pipeline Architecture
 * ============================================================
 */

(function () {
  'use strict';

  // Architecture Models Data (Derived from Suhas Phunde's Resume)
  const ARCHITECTURES = {
    bioavatar: {
      id: 'bioavatar',
      title: 'BioAvatar Digital Twins — AWS Multi-Region EKS & Agentic AI (2026)',
      subtitle: 'Client: GNQ Insilico Inc. (via IBM) | Dual-Region HIPAA & PIPEDA Enterprise Platform',
      metrics: [
        { label: 'Cloud Resources', val: '300+ / Env' },
        { label: 'Environments', val: '8 Envs (7 Accounts)' },
        { label: 'K8s Version', val: 'EKS v1.34' },
        { label: 'Compliance', val: 'HIPAA & PIPEDA' },
        { label: 'DR SLA', val: 'RTO 15m / RPO ~0' }
      ],
      nodes: [
        {
          id: 'landing_zone',
          name: 'AWS Landing Zone',
          category: 'Governance & IAM',
          pos: [0, 2.8, 0],
          color: 0x38bdf8,
          geom: 'dodecahedron',
          size: 1.1,
          desc: 'Designed multi-account Landing Zone with 5 Organizational Units (OUs) across 7 AWS accounts. Enforces strict SCPs, separate KMS keys, and zero cross-region data leakage between US and Canadian legal boundaries.'
        },
        {
          id: 'waf_edge',
          name: 'CloudFront & WAF',
          category: 'Edge Security',
          pos: [-3.8, 1.8, 1.2],
          color: 0xf59e0b,
          geom: 'cylinder',
          size: 0.85,
          desc: 'Global edge distribution with AWS WAF enforcing OWASP Top 10 rulesets, custom rate-limiting, geo-restriction, and SSL/TLS 1.3 termination.'
        },
        {
          id: 'hipaa_vpc',
          name: 'HIPAA VPC (us-east-1)',
          category: 'Healthcare Cloud',
          pos: [-2.4, -0.4, 1.8],
          color: 0x10b981,
          geom: 'box',
          size: 1.0,
          desc: 'Private-only multi-AZ subnet architecture hosting US patient digital twin data. Default-deny security groups, VPC endpoints for S3/DynamoDB, and encrypted transit.'
        },
        {
          id: 'pipeda_vpc',
          name: 'PIPEDA VPC (ca-central-1)',
          category: 'Sovereign Cloud',
          pos: [2.4, -0.4, 1.8],
          color: 0x06b6d4,
          geom: 'box',
          size: 1.0,
          desc: 'Canadian healthcare data residency environment. Zero cross-border data replication with IAM condition keys ensuring sovereign compliance.'
        },
        {
          id: 'eks_cluster',
          name: 'Amazon EKS v1.34',
          category: 'Kubernetes Platform',
          pos: [0, 0.2, 2.6],
          color: 0x8b5cf6,
          geom: 'sphere',
          size: 1.2,
          desc: 'Hardened Kubernetes with private-only API endpoints, AL2023 nodes, and Karpenter v1.1.1+ autoscaling. VPC CNI, CoreDNS, EBS/EFS CSI drivers via IAM Roles for Service Accounts (IRSA).'
        },
        {
          id: 'agentic_ai',
          name: 'LangGraph Agentic AI',
          category: 'AI Platform',
          pos: [0, -1.8, 2.2],
          color: 0xec4899,
          geom: 'octahedron',
          size: 1.1,
          desc: 'Stateful 5-node AI agent pipeline orchestrated via LangGraph. Custom Model Context Protocol (MCP) server integration, CrewAI/LangChain RAG, and AWS Bedrock foundation models accelerated with IBM Bob.'
        },
        {
          id: 'aurora_db',
          name: 'Aurora PostgreSQL Global',
          category: 'Persistent Data',
          pos: [3.6, -1.6, -0.4],
          color: 0x3b82f6,
          geom: 'cylinder',
          size: 0.95,
          desc: 'Serverless v2 for Dev/QA and Provisioned db.r6g.large for Prod. Active-Passive cross-region replication supporting near-instant failover (RTO < 15 min, RPO ~ 0).'
        },
        {
          id: 'secrets_kms',
          name: 'External Secrets & KMS',
          category: 'Zero-Trust Secrets',
          pos: [-3.4, -1.8, -0.8],
          color: 0x6366f1,
          geom: 'dodecahedron',
          size: 0.85,
          desc: 'External Secrets Operator (ESO) with ClusterSecretStore synced to AWS SSM Parameter Store and AWS KMS customer-managed keys (CMK) with automated 90-day rotation.'
        }
      ],
      connections: [
        ['landing_zone', 'waf_edge'],
        ['landing_zone', 'hipaa_vpc'],
        ['landing_zone', 'pipeda_vpc'],
        ['waf_edge', 'eks_cluster'],
        ['hipaa_vpc', 'eks_cluster'],
        ['pipeda_vpc', 'eks_cluster'],
        ['eks_cluster', 'agentic_ai'],
        ['eks_cluster', 'secrets_kms'],
        ['agentic_ai', 'aurora_db'],
        ['eks_cluster', 'aurora_db']
      ]
    },

    cicd: {
      id: 'cicd',
      title: 'DevSecOps Master CI/CD Orchestrator (2,500+ Lines)',
      subtitle: 'GitHub Actions OIDC, ARC Self-Hosted EKS Runners, and 9-Agent Pre-Push Guard',
      metrics: [
        { label: 'Orchestrator Code', val: '2,500+ Lines' },
        { label: 'Pipeline Stages', val: '10 Stages' },
        { label: 'Credential Model', val: 'GitHub OIDC (0 Static)' },
        { label: 'Pre-Push Guards', val: '9 AI Agents' },
        { label: 'Apply Success', val: '100% 1st Attempt' }
      ],
      nodes: [
        {
          id: 'git_commit',
          name: 'Developer Push & PR',
          category: 'Source Code',
          pos: [-4.2, 1.8, 0],
          color: 0x38bdf8,
          geom: 'box',
          size: 0.9,
          desc: 'Pre-commit hooks and 9-agent automated pre-push validation scanning for secrets, formatting, syntax, and stale dependency trees.'
        },
        {
          id: 'oidc_auth',
          name: 'GitHub OIDC Gate',
          category: 'Identity & Auth',
          pos: [-2.2, 1.8, 0.8],
          color: 0x10b981,
          geom: 'cylinder',
          size: 0.85,
          desc: 'Zero static cloud credentials. Short-lived STS tokens assumed via AWS IAM OIDC federation with branch and environment scoping.'
        },
        {
          id: 'arc_runners',
          name: 'ARC Runners on EKS',
          category: 'Compute Fleet',
          pos: [-0.4, 2.0, 1.4],
          color: 0x8b5cf6,
          geom: 'sphere',
          size: 1.1,
          desc: 'Actions Runner Controller (ARC) deploying dynamic container runners on dedicated EKS node groups with Karpenter spot instance scaling.'
        },
        {
          id: 'sast_scans',
          name: 'SAST & Snyk Security',
          category: 'Static Analysis',
          pos: [1.8, 1.8, 0.6],
          color: 0xf59e0b,
          geom: 'octahedron',
          size: 0.9,
          desc: 'SonarQube quality gate and Snyk dependency scanner blocking vulnerable packages, CVEs, and insecure code patterns before build artifacts are created.'
        },
        {
          id: 'tf_guard',
          name: 'EKS Protection Guard',
          category: 'IaC Governance',
          pos: [-1.4, -0.6, 2.0],
          color: 0x06b6d4,
          geom: 'dodecahedron',
          size: 1.0,
          desc: 'Engineered 4 stale-plan detection guards analyzing Terraform plan JSON; halts pipeline if accidental resource destruction or drift is detected.'
        },
        {
          id: 'trivy_container',
          name: 'Trivy Image Scanner',
          category: 'Container Security',
          pos: [1.2, -0.6, 1.8],
          color: 0xec4899,
          geom: 'cylinder',
          size: 0.85,
          desc: 'Deep vulnerability scanning on container base images and multi-stage builds. Enforces minimal distroless base images and non-root users.'
        },
        {
          id: 'gitops_deploy',
          name: 'Helm v3 & ArgoCD Rollout',
          category: 'Release Automation',
          pos: [3.8, -0.2, 0.2],
          color: 0x10b981,
          geom: 'box',
          size: 1.15,
          desc: 'Blue-Green and Canary zero-downtime progressive delivery orchestrated with automated health checks, smoke tests, and instant rollback triggers.'
        }
      ],
      connections: [
        ['git_commit', 'oidc_auth'],
        ['oidc_auth', 'arc_runners'],
        ['arc_runners', 'sast_scans'],
        ['arc_runners', 'tf_guard'],
        ['sast_scans', 'trivy_container'],
        ['tf_guard', 'gitops_deploy'],
        ['trivy_container', 'gitops_deploy']
      ]
    },

    tmobile: {
      id: 'tmobile',
      title: 'T-Mobile DPTC — Azure to Enterprise Kubernetes Migration',
      subtitle: 'Client: T-Mobile US (via IBM) | ★ T-Mobile Client Appreciation KUDOS Award (2025)',
      metrics: [
        { label: 'Microservices', val: '50+ Migrated' },
        { label: 'Downtime', val: 'Zero Downtime' },
        { label: 'Security Auth', val: 'GaraSign Key-Pair' },
        { label: 'Data Platforms', val: 'Kafka & Snowflake' },
        { label: 'Recognition', val: '★ Client KUDOS (2025)' }
      ],
      nodes: [
        {
          id: 'azure_legacy',
          name: 'Legacy Azure Cloud',
          category: 'Source Infrastructure',
          pos: [-3.8, 1.2, 0],
          color: 0x38bdf8,
          geom: 'box',
          size: 1.0,
          desc: 'Initial hosting environment for 50+ microservices requiring legacy Azure Vault integration and complex cross-cloud connectivity.'
        },
        {
          id: 'garasign_auth',
          name: 'GaraSign & CyberArk',
          category: 'Zero-Trust Security',
          pos: [-1.4, 2.0, 1.0],
          color: 0xf59e0b,
          geom: 'dodecahedron',
          size: 0.9,
          desc: 'Implemented GaraSign key-pair authentication for Snowflake and CyberArk SAFE secrets management with strict TMO production deploy approvals.'
        },
        {
          id: 'k8s_destination',
          name: 'Kubernetes Platform',
          category: 'Target Infrastructure',
          pos: [0.6, 0.4, 2.2],
          color: 0x8b5cf6,
          geom: 'sphere',
          size: 1.25,
          desc: 'Enterprise Kubernetes cluster hosting 50+ containerized microservices managed via modular Helm charts with rolling updates and automated pod disruption budgets.'
        },
        {
          id: 'kafka_stream',
          name: 'Apache Kafka Bus',
          category: 'Event Streaming',
          pos: [2.8, 1.8, 0.8],
          color: 0xec4899,
          geom: 'cylinder',
          size: 0.95,
          desc: 'High-throughput event streaming fabric processing real-time customer and network telecommunications telemetry with zero loss.'
        },
        {
          id: 'snowflake_dw',
          name: 'Snowflake Analytics',
          category: 'Data Cloud',
          pos: [3.4, -0.8, 1.4],
          color: 0x06b6d4,
          geom: 'cylinder',
          size: 1.05,
          desc: 'Automated Snowflake schema and role provisioning pipelines via GitLab CI/CD with optimized SQL query extraction.'
        },
        {
          id: 'obs_splunk',
          name: 'Splunk & AppDynamics',
          category: 'Full Observability',
          pos: [-0.6, -1.8, 1.2],
          color: 0x10b981,
          geom: 'octahedron',
          size: 0.95,
          desc: 'End-to-end distributed transaction tracing, custom dashboarding, automated incident alerting, and Karate/Selenium regression pipelines.'
        }
      ],
      connections: [
        ['azure_legacy', 'garasign_auth'],
        ['garasign_auth', 'k8s_destination'],
        ['azure_legacy', 'k8s_destination'],
        ['k8s_destination', 'kafka_stream'],
        ['kafka_stream', 'snowflake_dw'],
        ['k8s_destination', 'obs_splunk'],
        ['snowflake_dw', 'obs_splunk']
      ]
    },

    vault: {
      id: 'vault',
      title: 'Options Clearing Corp (OCC) — Enterprise Vault Migration',
      subtitle: 'Client: OCC (via IBM) | Zero-Trust Secrets Orchestration & 95% Risk Reduction',
      metrics: [
        { label: 'Risk Reduction', val: '95% Incident Drop' },
        { label: 'Automation', val: '100% Shell & API' },
        { label: 'Cluster Type', val: 'Multi-AZ Vault HA' },
        { label: 'Build Integrations', val: 'Snyk & TeamCity' },
        { label: 'Audit Compliance', val: 'FINRA / Financial' }
      ],
      nodes: [
        {
          id: 'source_vault',
          name: 'Legacy Vault Cluster',
          category: 'Source Secrets',
          pos: [-3.4, 0.8, 0],
          color: 0xef4444,
          geom: 'cylinder',
          size: 1.0,
          desc: 'Legacy HashiCorp Vault instance containing unstandardized secret paths, deprecated lease engines, and legacy token lifecycles.'
        },
        {
          id: 'migration_engine',
          name: 'API Migration Engine',
          category: 'Automation Orchestrator',
          pos: [0, 1.6, 1.2],
          color: 0x38bdf8,
          geom: 'dodecahedron',
          size: 1.1,
          desc: 'Engineered custom shell scripts using Vault HTTP REST APIs with automatic retries, parallel worker threads, and zero-plaintext memory handling.'
        },
        {
          id: 'target_vault',
          name: 'Target Enterprise Vault',
          category: 'High-Availability Target',
          pos: [3.4, 0.8, 0],
          color: 0x10b981,
          geom: 'cylinder',
          size: 1.0,
          desc: 'High-availability multi-AZ Vault deployment with Raft storage, auto-unseal via KMS, and strict least-privilege AppRole policies.'
        },
        {
          id: 'snyk_gates',
          name: 'Snyk CI Security Gates',
          category: 'Vulnerability Detection',
          pos: [-1.6, -1.2, 1.6],
          color: 0xf59e0b,
          geom: 'box',
          size: 0.9,
          desc: 'Integrated Snyk vulnerability detection across Jenkins and TeamCity build jobs for Maven and Ant enterprise applications.'
        },
        {
          id: 'transit_lease',
          name: 'Transit Engine & Leasing',
          category: 'Cryptography',
          pos: [1.6, -1.2, 1.6],
          color: 0x8b5cf6,
          geom: 'octahedron',
          size: 0.95,
          desc: 'Dynamic database credentials with automatic TTL revocation, transit cryptography-as-a-service, and audit log streaming.'
        }
      ],
      connections: [
        ['source_vault', 'migration_engine'],
        ['migration_engine', 'target_vault'],
        ['migration_engine', 'snyk_gates'],
        ['target_vault', 'transit_lease'],
        ['snyk_gates', 'transit_lease']
      ]
    }
  };

  // State
  let currentArchKey = 'bioavatar';
  let scene, camera, renderer;
  let nodeMeshMap = new Map();
  let nodeGroup, connectionGroup, particleGroup;
  let splineCurves = [];
  let packets = [];
  let autoRotate = true;
  let isWireframe = false;
  let streamActive = true;
  let canvasContainer = null;
  let hoveredNode = null;

  // Mouse / Pointer Interaction State
  let mouse = { x: 0, y: 0, rawX: 0, rawY: 0, isDown: false };
  let cameraAngle = { theta: 0.35, phi: 1.18, radius: 10.5 };
  let targetAngle = { theta: 0.35, phi: 1.18, radius: 10.5 };
  let raycaster, clock;

  // Initialize
  function init() {
    canvasContainer = document.getElementById('arch3d-viewport');
    if (!canvasContainer) return;

    if (typeof THREE === 'undefined') {
      console.warn('Three.js library not found. 3D Architecture Visualizer deferred.');
      return;
    }

    const width = canvasContainer.clientWidth || 800;
    const height = canvasContainer.clientHeight || 520;

    // 1. Scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080c16, 0.045);

    // 2. Camera
    camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    updateCameraPosition();

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    canvasContainer.innerHTML = '';
    canvasContainer.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.4);
    dirLight1.position.set(5, 10, 7);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xa855f7, 1.2);
    dirLight2.position.set(-5, -6, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
    pointLight.position.set(0, 0, 4);
    scene.add(pointLight);

    // 5. Grid Ground & Cyberpunk Ring
    buildCyberGrid();

    // 6. Groups
    nodeGroup = new THREE.Group();
    connectionGroup = new THREE.Group();
    particleGroup = new THREE.Group();
    scene.add(nodeGroup);
    scene.add(connectionGroup);
    scene.add(particleGroup);

    raycaster = new THREE.Raycaster();
    clock = new THREE.Clock();

    // 7. Render initial architecture
    loadArchitecture(currentArchKey);

    // 8. Event Listeners
    setupControls();
    setupUIControls();

    // 9. Animation Loop
    animate();

    // Trigger initial node display
    showNodeDetails(ARCHITECTURES[currentArchKey].nodes[0]);
  }

  function updateCameraPosition() {
    cameraAngle.theta += (targetAngle.theta - cameraAngle.theta) * 0.08;
    cameraAngle.phi += (targetAngle.phi - cameraAngle.phi) * 0.08;
    cameraAngle.radius += (targetAngle.radius - cameraAngle.radius) * 0.08;

    // Clamp phi to prevent gimbal lock
    cameraAngle.phi = Math.max(0.2, Math.min(Math.PI - 0.2, cameraAngle.phi));
    cameraAngle.radius = Math.max(5, Math.min(18, cameraAngle.radius));

    camera.position.x = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.sin(cameraAngle.theta);
    camera.position.y = cameraAngle.radius * Math.cos(cameraAngle.phi);
    camera.position.z = cameraAngle.radius * Math.sin(cameraAngle.phi) * Math.cos(cameraAngle.theta);
    camera.lookAt(0, 0, 0);
  }

  function buildCyberGrid() {
    // Hexagonal / Grid Ground Plane
    const gridHelper = new THREE.GridHelper(16, 24, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -3.2;
    gridHelper.material.opacity = 0.45;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);

    // Glowing Concentric Rings
    const ringGeo = new THREE.RingGeometry(5.5, 5.65, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -3.18;
    scene.add(ringMesh);

    const outerRingGeo = new THREE.RingGeometry(7.2, 7.3, 64);
    const outerRingMat = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25
    });
    const outerRing = new THREE.Mesh(outerRingGeo, outerRingMat);
    outerRing.rotation.x = Math.PI / 2;
    outerRing.position.y = -3.19;
    scene.add(outerRing);
  }

  function createNodeGeometry(geomType, size) {
    switch (geomType) {
      case 'box':
        return new THREE.BoxGeometry(size * 1.2, size * 1.2, size * 1.2);
      case 'cylinder':
        return new THREE.CylinderGeometry(size * 0.7, size * 0.7, size * 1.1, 24);
      case 'octahedron':
        return new THREE.OctahedronGeometry(size * 0.85);
      case 'dodecahedron':
        return new THREE.DodecahedronGeometry(size * 0.85);
      case 'sphere':
      default:
        return new THREE.SphereGeometry(size * 0.75, 32, 32);
    }
  }

  function loadArchitecture(key) {
    currentArchKey = key;
    const arch = ARCHITECTURES[key];
    if (!arch) return;

    // Clear existing objects
    while (nodeGroup.children.length > 0) {
      const obj = nodeGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      nodeGroup.remove(obj);
    }
    while (connectionGroup.children.length > 0) {
      const obj = connectionGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      connectionGroup.remove(obj);
    }
    while (particleGroup.children.length > 0) {
      const obj = particleGroup.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      particleGroup.remove(obj);
    }

    nodeMeshMap.clear();
    splineCurves = [];
    packets = [];
    hoveredNode = null;

    // Update UI Header
    const titleEl = document.getElementById('arch3d-title');
    const subtitleEl = document.getElementById('arch3d-subtitle');
    const metricsEl = document.getElementById('arch3d-metrics-strip');

    if (titleEl) titleEl.textContent = arch.title;
    if (subtitleEl) subtitleEl.textContent = arch.subtitle;

    if (metricsEl) {
      metricsEl.innerHTML = arch.metrics
        .map(
          m => `
        <div class="arch3d-metric-pill">
          <span class="arch3d-metric-label">${m.label}</span>
          <span class="arch3d-metric-val">${m.val}</span>
        </div>`
        )
        .join('');
    }

    // 1. Build Nodes
    arch.nodes.forEach(n => {
      const geom = createNodeGeometry(n.geom, n.size);
      const mat = new THREE.MeshStandardMaterial({
        color: n.color,
        roughness: 0.2,
        metalness: 0.75,
        wireframe: isWireframe,
        emissive: n.color,
        emissiveIntensity: 0.35
      });

      const mesh = new THREE.Mesh(geom, mat);
      mesh.position.set(n.pos[0], n.pos[1], n.pos[2]);
      mesh.userData = n;
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Outer Halo Ring for each node
      const haloGeo = new THREE.RingGeometry(n.size * 0.9, n.size * 1.05, 32);
      const haloMat = new THREE.MeshBasicMaterial({
        color: n.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4
      });
      const haloMesh = new THREE.Mesh(haloGeo, haloMat);
      haloMesh.rotation.x = Math.PI / 2;
      mesh.add(haloMesh);
      mesh.userData.halo = haloMesh;

      nodeGroup.add(mesh);
      nodeMeshMap.set(n.id, mesh);
    });

    // 2. Build Conduits / Connections
    arch.connections.forEach(([fromId, toId]) => {
      const fromMesh = nodeMeshMap.get(fromId);
      const toMesh = nodeMeshMap.get(toId);
      if (!fromMesh || !toMesh) return;

      const p1 = fromMesh.position;
      const p2 = toMesh.position;

      // Mid-point curve offset
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.y += 0.45;

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      splineCurves.push(curve);

      // Tube Geometry for cyber conduit
      const tubeGeo = new THREE.TubeGeometry(curve, 32, 0.045, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: 0x0284c7,
        emissive: 0x0284c7,
        emissiveIntensity: 0.4,
        roughness: 0.3,
        metalness: 0.8,
        transparent: true,
        opacity: 0.75
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      connectionGroup.add(tubeMesh);

      // Create animated packet on this spline
      const packetGeo = new THREE.SphereGeometry(0.09, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.95
      });
      const packetMesh = new THREE.Mesh(packetGeo, packetMat);
      particleGroup.add(packetMesh);

      packets.push({
        mesh: packetMesh,
        curve: curve,
        t: Math.random(),
        speed: 0.004 + Math.random() * 0.003
      });
    });

    // Select first node
    showNodeDetails(arch.nodes[0]);
  }

  function showNodeDetails(nodeData) {
    if (!nodeData) return;
    const detailBox = document.getElementById('arch3d-node-details');
    if (!detailBox) return;

    detailBox.innerHTML = `
      <div class="arch3d-inspector-card">
        <div class="arch3d-inspector-header">
          <div class="arch3d-inspector-tag" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);">
            ${nodeData.category}
          </div>
          <h4 class="arch3d-inspector-title">${nodeData.name}</h4>
        </div>
        <p class="arch3d-inspector-desc">${nodeData.desc}</p>
        <div class="arch3d-inspector-actions">
          <a class="arch3d-btn-mini" href="#experience">
            <span>Explore Experience Section →</span>
          </a>
        </div>
      </div>
    `;
  }

  function setupControls() {
    const dom = renderer.domElement;

    dom.addEventListener('mousedown', e => {
      mouse.isDown = true;
      mouse.rawX = e.clientX;
      mouse.rawY = e.clientY;
      autoRotate = false;
    });

    window.addEventListener('mouseup', () => {
      mouse.isDown = false;
    });

    dom.addEventListener('mousemove', e => {
      const rect = dom.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (mouse.isDown) {
        const dx = e.clientX - mouse.rawX;
        const dy = e.clientY - mouse.rawY;
        mouse.rawX = e.clientX;
        mouse.rawY = e.clientY;

        targetAngle.theta += dx * 0.008;
        targetAngle.phi -= dy * 0.008;
      }
    });

    dom.addEventListener('wheel', e => {
      e.preventDefault();
      targetAngle.radius += e.deltaY * 0.008;
      autoRotate = false;
    }, { passive: false });

    // Touch Support
    let touchStartDist = 0;
    dom.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        mouse.isDown = true;
        mouse.rawX = e.touches[0].clientX;
        mouse.rawY = e.touches[0].clientY;
        autoRotate = false;
      } else if (e.touches.length === 2) {
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
      }
    });

    dom.addEventListener('touchmove', e => {
      if (e.touches.length === 1 && mouse.isDown) {
        const dx = e.touches[0].clientX - mouse.rawX;
        const dy = e.touches[0].clientY - mouse.rawY;
        mouse.rawX = e.touches[0].clientX;
        mouse.rawY = e.touches[0].clientY;

        targetAngle.theta += dx * 0.008;
        targetAngle.phi -= dy * 0.008;
      } else if (e.touches.length === 2) {
        const dist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = touchStartDist - dist;
        touchStartDist = dist;
        targetAngle.radius += delta * 0.015;
      }
    });

    dom.addEventListener('touchend', () => {
      mouse.isDown = false;
    });

    // Click selection
    dom.addEventListener('click', () => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeGroup.children);
      if (intersects.length > 0) {
        const node = intersects[0].object.userData;
        showNodeDetails(node);
      }
    });

    // Resize
    window.addEventListener('resize', onWindowResize);
  }

  function onWindowResize() {
    if (!canvasContainer || !renderer || !camera) return;
    const width = canvasContainer.clientWidth || 800;
    const height = canvasContainer.clientHeight || 520;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }

  function setupUIControls() {
    // Architecture switch buttons
    const navButtons = document.querySelectorAll('[data-arch-switch]');
    navButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        navButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const key = btn.getAttribute('data-arch-switch');
        loadArchitecture(key);
      });
    });

    // HUD controls
    const btnResetCam = document.getElementById('btnResetArchCam');
    if (btnResetCam) {
      btnResetCam.addEventListener('click', () => {
        targetAngle = { theta: 0.35, phi: 1.18, radius: 10.5 };
        autoRotate = true;
      });
    }

    const btnToggleRotate = document.getElementById('btnToggleArchRotate');
    if (btnToggleRotate) {
      btnToggleRotate.addEventListener('click', () => {
        autoRotate = !autoRotate;
        btnToggleRotate.classList.toggle('active', autoRotate);
      });
    }

    const btnToggleWire = document.getElementById('btnToggleArchWire');
    if (btnToggleWire) {
      btnToggleWire.addEventListener('click', () => {
        isWireframe = !isWireframe;
        nodeGroup.children.forEach(mesh => {
          if (mesh.material) mesh.material.wireframe = isWireframe;
        });
        btnToggleWire.classList.toggle('active', isWireframe);
      });
    }

    const btnToggleStream = document.getElementById('btnToggleArchStream');
    if (btnToggleStream) {
      btnToggleStream.addEventListener('click', () => {
        streamActive = !streamActive;
        particleGroup.visible = streamActive;
        btnToggleStream.classList.toggle('active', streamActive);
      });
    }
  }

  function animate() {
    requestAnimationFrame(animate);

    if (clock) {
      clock.getDelta();
    }

    // Auto rotate when idle
    if (autoRotate) {
      targetAngle.theta += 0.0035;
    }

    updateCameraPosition();

    // Rotate node meshes gently
    nodeGroup.children.forEach((mesh, index) => {
      mesh.rotation.y += 0.01;
      mesh.rotation.x += 0.005;

      // Pulse halo
      if (mesh.userData.halo) {
        mesh.userData.halo.rotation.z += 0.015;
        const scale = 1 + Math.sin(Date.now() * 0.003 + index) * 0.08;
        mesh.userData.halo.scale.set(scale, scale, 1);
      }
    });

    // Raycast hover effect
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(nodeGroup.children);

    if (intersects.length > 0) {
      const topObj = intersects[0].object;
      if (hoveredNode !== topObj) {
        if (hoveredNode && hoveredNode.material) {
          hoveredNode.material.emissiveIntensity = 0.35;
        }
        hoveredNode = topObj;
        if (hoveredNode.material) {
          hoveredNode.material.emissiveIntensity = 0.85;
        }
        canvasContainer.style.cursor = 'pointer';
      }
    } else {
      if (hoveredNode && hoveredNode.material) {
        hoveredNode.material.emissiveIntensity = 0.35;
      }
      hoveredNode = null;
      canvasContainer.style.cursor = 'grab';
    }

    // Move packet particles along splines
    if (streamActive) {
      packets.forEach(p => {
        p.t += p.speed;
        if (p.t > 1) p.t = 0;
        const point = p.curve.getPoint(p.t);
        p.mesh.position.copy(point);
      });
    }

    renderer.render(scene, camera);
  }

  // Auto-init on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Global export
  window.DevSecOps3D = {
    init: init,
    loadArchitecture: loadArchitecture,
    getArchitectures: () => ARCHITECTURES
  };
})();
