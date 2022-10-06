export const schema = {
  $schema: 'https://json-schema.org/draft/2019-09/schema',
  type: 'object',
  properties: {
    image: {
      type: 'object',
      title: 'Container images config',
      properties: {
        registry: {
          type: 'string',
          default: 'gcr.io',
          title: 'Container images registry address',
        },
        repository: {
          type: 'string',
          default: 'kasten-images',
          title: 'Container images repository name',
        },
        image: {
          type: 'string',
        },
        tag: {
          type: 'string',
          title: 'Container images tag',
        },
        pullPolicy: {
          type: 'string',
          default: 'Always',
          title: 'Container images pullPolicy',
          enum: ['IfNotPresent', 'Always', 'Never'],
        },
      },
    },
    rbac: {
      type: 'object',
      title: 'RBAC configuration',
      properties: {
        create: {
          type: 'boolean',
          default: true,
        },
      },
    },
    serviceAccount: {
      type: 'object',
      title: 'ServiceAccount details',
      properties: {
        create: {
          type: 'boolean',
          default: true,
          title: 'Create a ServiceAccount',
          description: 'Specifies whether a ServiceAccount should be created',
        },
        name: {
          type: 'string',
          default: '',
          title: 'The name of the ServiceAccount',
          description:
            'The name of the ServiceAccount to use. If not set and create is true, a name is derived using the release and chart names',
        },
      },
    },
    scc: {
      type: 'object',
      title: 'Security Context Constraints details',
      properties: {
        create: {
          type: 'boolean',
          default: false,
          title: 'Create K10 SSC',
          description: 'Whether to create a SecurityContextConstraints for K10 ServiceAccounts',
        },
      },
    },
    networkPolicy: {
      type: 'object',
      title: 'NetworkPolicy details',
      properties: {
        create: {
          type: 'boolean',
          default: true,
          title: 'Whether to create NetworkPolicies for the K10 services',
        },
      },
    },
    global: {
      type: 'object',
      title: 'Global settings',
      properties: {
        airgapped: {
          type: 'object',
          title: 'Airgapped offline installation details',
          properties: {
            repository: {
              type: 'string',
              title: 'The helm repository for offline (airgapped) installation',
            },
          },
        },
        persistence: {
          type: 'object',
          title: 'Persistent Volume global details',
          properties: {
            mountPath: {
              type: 'string',
              default: '/mnt/k10state',
              title: 'Persistent Volume global mount path',
            },
            enabled: {
              type: 'boolean',
              default: true,
              title: 'Enable Persistent Volume',
            },
            storageClass: {
              type: 'string',
              default: '',
              title: 'Persistent Volume global Storageclass',
              description:
                "If set to '-', dynamic provisioning is disabled. If undefined (the default) or set to null, the default provisioner is used. (e.g gp2 on AWS, standard on GKE, AWS & OpenStack)",
            },
            accessMode: {
              type: 'string',
              default: 'ReadWriteOnce',
              title: 'Persistent Volume global AccessMode',
              enum: ['ReadWriteOnce', 'ReadOnlyMany', 'ReadWriteMany'],
            },
            size: {
              type: 'string',
              default: '20Gi',
              title: 'Persistent Volume size',
            },
            metering: {
              type: 'object',
              title: 'Metering service Persistent Volume details',
              properties: {
                size: {
                  type: 'string',
                  default: '2Gi',
                  title: 'Metering service Persistent Volume size',
                  description: 'If not set, global.persistence.size is used',
                },
              },
            },
            catalog: {
              type: 'object',
              title: 'Catalog service Persistent Volume details',
              properties: {
                size: {
                  type: 'string',
                  default: '',
                  title: 'Catalog service Persistent Volume size',
                  description: 'If not set, global.persistence.size is used.',
                },
              },
            },
            jobs: {
              type: 'object',
              title: 'Jobs service Persistent Volume details',
              properties: {
                size: {
                  type: 'string',
                  default: '',
                  title: 'Jobs service Persistent Volume size',
                  description: 'If not set, global.persistence.size is used.',
                },
              },
            },
            logging: {
              type: 'object',
              title: 'Logging service Persistent Volume details',
              properties: {
                size: {
                  type: 'string',
                  default: '',
                  title: 'Logging service Persistent Volume size',
                  description: 'If not set, global.persistence.size is used.',
                },
              },
            },
            grafana: {
              type: 'object',
              title: 'Grafana service Persistent Volume details',
              properties: {
                size: {
                  type: 'string',
                  default: '5Gi',
                  title: 'Grafana service Persistent Volume size',
                  description: 'If not set, global.persistence.size is used.',
                },
              },
            },
          },
        },
        upstreamCertifiedImages: {
          type: 'boolean',
          default: false,
          title: 'Do we want to use certified version to upstream container images',
        },
        rhMarketPlace: {
          type: 'boolean',
          default: false,
          title: 'Set it to true while generating helm operator',
        },
        images: {
          type: 'object',
          title: 'Global image settings',
          properties: {
            admin: {
              type: 'string',
              title: 'Admin service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            aggregatedapis: {
              type: 'string',
              title: 'Aggregatedapis service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            ambassador: {
              type: 'string',
              title: 'Ambassador service container image',
            },
            auth: {
              type: 'string',
              title: 'Auth service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            bloblifecyclemanager: {
              type: 'string',
              title: 'Bloblifecyclemanager service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            catalog: {
              type: 'string',
              title: 'Catalog service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            cephtool: {
              type: 'string',
              title: 'Cephtool service container image',
            },
            'configmap-reload': {
              type: 'string',
              title: 'Configmap-reload service container image',
            },
            controllermanager: {
              type: 'string',
              title: 'Controllermanager service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            crypto: {
              type: 'string',
              title: 'Crypto service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            dashboardbff: {
              type: 'string',
              title: 'Dashboardbff service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            datamover: {
              type: 'string',
              title: 'Datamover service container image',
            },
            dex: {
              type: 'string',
              title: 'Dex service container image',
            },
            emissary: {
              type: 'string',
              title: 'Emissary service container image',
            },
            events: {
              type: 'string',
              title: 'Events service container image',
            },
            executor: {
              type: 'string',
              title: 'Executor service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            frontend: {
              type: 'string',
              title: 'Frontend service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            grafana: {
              type: 'string',
              title: 'Grafana service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            jobs: {
              type: 'string',
              title: 'Jobs service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            'kanister-tools': {
              type: 'string',
              title: 'Kanister-tools service container image',
            },
            kanister: {
              type: 'string',
              title: 'Kanister service container image',
            },
            logging: {
              type: 'string',
              title: 'Logging service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            metering: {
              type: 'string',
              title: 'Metering service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            paygo_daemonset: {
              type: 'string',
              title: 'Paygo_daemonset service container image',
            },
            prometheus: {
              type: 'string',
              title: 'Prometheus service container image',
            },
            state: {
              type: 'string',
              title: 'State service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            upgrade: {
              type: 'string',
              title: 'Upgrade service container image',
            },
            vbrintegrationapi: {
              type: 'string',
              title: 'Vbrintegrationapi service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
            garbagecollector: {
              type: 'string',
              title: 'Garbagecollector service container image',
              description:
                "If not set, the image name is formed with '(global.airgapped.repository)|(image.registry/image.repository)/<service-name>:(Chart.AppVersion)|(image.tag)'",
            },
          },
        },
        imagePullSecret: {
          type: 'string',
          title: 'Container image pull secret',
          description:
            'Secret which contains docker config for private repository. Use `k10-ecr` when secrets.dockerConfigPath is used.',
        },
        ingress: {
          type: 'object',
          title: 'Global Ingress settings',
          properties: {
            create: {
              type: 'boolean',
              default: false,
              title: 'Whether the K10 dashboard should be exposed via ingress',
            },
            urlPath: {
              type: 'string',
              title: 'URL path for ingress config',
            },
          },
        },
        route: {
          type: 'object',
          title: 'Global Route settings',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Whether the K10 dashboard should be exposed via route',
            },
            path: {
              type: 'string',
              title: 'Route path',
            },
          },
        },
        prometheus: {
          type: 'object',
          title: 'Global prometheus settings',
          properties: {
            external: {
              type: 'object',
              title: 'External prometheus settings',
              properties: {
                host: {
                  type: 'string',
                  title: 'External prometheus host name',
                },
                port: {
                  type: 'string',
                  title: 'External prometheus port number',
                },
                baseURL: {
                  type: 'string',
                  title: 'External prometheus baseURL',
                },
              },
            },
          },
        },
        network: {
          type: 'object',
          title: 'Global network settings',
          properties: {
            enable_ipv6: {
              type: 'boolean',
              default: false,
              title: 'Whether to enble ipv6',
            },
          },
        },
      },
    },
    route: {
      type: 'object',
      title: 'OpenShift route configuration',
      properties: {
        enabled: {
          type: 'boolean',
          default: false,
          title: 'Whether the K10 dashboard should be exposed via route',
        },
        host: {
          type: 'string',
          title: 'Host name for the route',
        },
        path: {
          type: 'string',
          title: 'Path for the route',
        },
        annotations: {
          type: 'object',
          title: 'Annotations for the route',
          examples: [
            {
              'kubernetes.io/tls-acme': 'true',
              'haproxy.router.openshift.io/disable_cookies': 'true',
              'haproxy.router.openshift.io/balance': 'roundrobin',
            },
          ],
        },
        labels: {
          type: 'object',
          title: 'Labels for the route resource',
          examples: [
            {
              foo: 'bar',
            },
          ],
        },
        tls: {
          type: 'object',
          title: 'TLS configuration for the route',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Whether to enable TLS',
            },
            insecureEdgeTerminationPolicy: {
              type: 'string',
              default: 'Redirect',
              title: 'What to do in case of an insecure traffic edge termination',
              enum: ['None', 'Allow', 'Redirect', ''],
            },
            termination: {
              type: 'string',
              default: 'edge',
              title: 'The termination Schema',
              enum: ['edge', 'passthrough', 'reencrypt'],
            },
          },
        },
      },
    },
    toolsImage: {
      type: 'object',
      title: 'ToolsImage config',
      properties: {
        enabled: {
          type: 'boolean',
          default: true,
          title: 'Whether to enable tools image',
        },
        pullPolicy: {
          type: 'string',
          default: 'Always',
          title: 'Tools image pullPolicy',
        },
      },
    },
    dexImage: {
      type: 'object',
      title: 'The dexImage Schema',
      properties: {
        registry: {
          type: 'string',
          default: 'quay.io',
          title: 'Dex image registry',
        },
        repository: {
          type: 'string',
          default: 'dexidp',
          title: 'Dex image repository',
        },
        image: {
          type: 'string',
          default: 'dex',
          title: 'Dex image name',
        },
      },
    },
    kanisterToolsImage: {
      type: 'object',
      title: 'kanisterToolsImage config',
      properties: {
        registry: {
          type: 'string',
          default: 'ghcr.io',
          title: 'kanister-tools image registry',
        },
        repository: {
          type: 'string',
          default: 'kanisterio',
          title: 'kanister-tools image repository',
        },
        image: {
          type: 'string',
          default: 'kanister-tools',
          title: 'Kanister tools image name',
        },
        pullPolicy: {
          type: 'string',
          default: 'Always',
          title: 'Kanister tools image pullPolicy',
        },
      },
    },
    ingress: {
      type: 'object',
      title: 'Ingress configuration',
      properties: {
        create: {
          type: 'boolean',
          default: false,
          title: 'whether the K10 dashboard should be exposed via ingress',
        },
        tls: {
          type: 'object',
          title: 'TLS configuration for ingress',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Configures a TLS use for ingress.host',
            },
          },
        },
        class: {
          type: 'string',
          title: 'Cluster ingress controller class: nginx, GCE',
        },
        host: {
          type: 'string',
          title: 'FQDN for name-based virtual host',
          examples: ['/k10.example.com'],
        },
        urlPath: {
          type: 'string',
          title: 'URL path for K10 Dashboard',
          examples: ['/k10'],
        },
        pathType: {
          type: 'string',
          title: 'the path type for the ingress resource',
          enum: ['Exact', 'Prefix', 'ImplementationSpecific'],
        },
      },
    },
    eula: {
      type: 'object',
      title: 'EULA configuration',
      properties: {
        accept: {
          type: 'boolean',
          default: false,
          title: ' enable accept EULA before installation',
        },
      },
    },
    license: {
      type: 'string',
      title: 'License string obtained from Kasten',
    },
    cluster: {
      type: 'object',
      title: 'Cluster configuration',
      properties: {
        domainName: {
          type: 'string',
          default: 'cluster.local',
          title: 'Domain name of the cluster',
        },
      },
    },
    prometheus: {
      type: 'object',
      title: 'Internal Prometheus configuration',
      properties: {
        k10image: {
          type: 'object',
          title: 'Prometheus image configurations',
          properties: {
            registry: {
              type: 'string',
              default: 'gcr.io',
              title: 'Prometheus image registry',
            },
            repository: {
              type: 'string',
              default: 'kasten-images',
              title: 'Prometheus image repository',
            },
          },
        },
        initChownData: {
          type: 'object',
          title: 'Prometheus init container configuration',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Run initChownData  init container',
            },
          },
        },
        rbac: {
          type: 'object',
          title: 'Prometheus rbac config',
          properties: {
            create: {
              type: 'boolean',
              default: false,
              title: 'Whether to create Prometheus rbac configuration',
            },
          },
        },
        alertmanager: {
          type: 'object',
          title: 'Prometheus alertmanager config',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Create Prometheus alertmanager service',
            },
          },
        },
        kubeStateMetrics: {
          type: 'object',
          title: 'Prometheus kubeStateMetrics config',
          required: ['enabled'],
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
              title: 'Create Prometheus KubeStateMetrics service',
            },
          },
        },
        networkPolicy: {
          type: 'object',
          title: 'Prometheus NetworkPolicy config',
          properties: {
            enabled: {
              type: 'boolean',
              default: true,
              title: 'Create Prometheus NetworkPolicy',
            },
          },
        },
        nodeExporter: {
          type: 'object',
          title: 'Prometheus NodeExporter config',
          properties: {
            enabled: {
              type: 'boolean',
              title: 'Create Prometheus NodeExporter service',
            },
          },
        },
        pushgateway: {
          type: 'object',
          title: 'Prometheus PushGateway config',
          properties: {
            enabled: {
              type: 'boolean',
              title: 'Create Prometheus PushGateway service',
            },
          },
        },
        scrapeCAdvisor: {
          type: 'boolean',
          default: false,
          title: 'Create Prometheus ScrapeCAdvisor service',
        },
        server: {
          type: 'object',
          title: 'Prometheus Server config',
          properties: {
            enabled: {
              type: 'boolean',
              default: true,
              title: 'Create Prometheus server',
            },
            securityContext: {
              type: 'object',
              title: 'Prometheus server securityContext config',
              properties: {
                runAsUser: {
                  type: 'integer',
                  default: 65534,
                  title: 'securityContext runAsUser ID',
                },
                runAsNonRoot: {
                  type: 'boolean',
                  default: true,
                  title: 'Enable securityContext runAsNonRoot',
                },
                runAsGroup: {
                  type: 'integer',
                  default: 65534,
                  title: 'securityContext runAsGroup ID',
                },
                fsGroup: {
                  type: 'integer',
                  default: 65534,
                  title: 'securityContext fsGroup ID',
                },
              },
            },
            retention: {
              type: 'string',
              default: '30d',
              title: 'Prometheus retention config',
            },
            strategy: {
              type: 'object',
              title: 'Prometheus deployment strategy',
              properties: {
                rollingUpdate: {
                  type: 'object',
                  default: {},
                  title: 'Prometheus rollingUpdate config',
                  properties: {
                    maxSurge: {
                      type: 'string',
                      default: '100%',
                      title: 'rollingUpdate maxSurge',
                    },
                    maxUnavailable: {
                      type: 'string',
                      default: '100%',
                      title: 'rollingUpdate maxUnavailable',
                    },
                  },
                },
                type: {
                  type: 'string',
                  default: 'RollingUpdate',
                  title: 'Type of deployment',
                  enum: ['Recreate', 'RollingUpdate'],
                },
              },
            },
            persistentVolume: {
              type: 'object',
              title: 'Prometheus persistent volume config',
              properties: {
                enabled: {
                  type: 'boolean',
                  default: true,
                  title: 'Create PersistentVolumeClaim for Prometheus server',
                },
                storageClass: {
                  type: 'string',
                  default: '',
                  title: 'StorageClassName used to create Prometheus PVC',
                  description: 'Setting this option overwrites global StorageClass value',
                },
              },
            },
            configMapOverrideName: {
              type: 'string',
              default: 'k10-prometheus-config',
              title: 'Prometheus configmap name to override default generated name',
            },
            fullnameOverride: {
              type: 'string',
              default: 'prometheus-server',
              title: 'Prometheus server deployment name',
            },
            baseURL: {
              type: 'string',
              default: '/k10/prometheus/',
              title: 'Prometheus external url path at which the server can be accessed',
            },
            prefixURL: {
              type: 'string',
              default: '/k10/prometheus',
              title: 'Prometheus prefix slug at which the server can be accessed',
            },
          },
        },
        serviceAccounts: {
          type: 'object',
          default: {},
          title: 'Prometheus service account config',
          properties: {
            alertmanager: {
              type: 'object',
              title: 'Alertmanager service account config',
              properties: {
                create: {
                  type: 'boolean',
                  default: true,
                  title: 'Create ServiceAccount for Alertmanager service',
                },
              },
            },
            kubeStateMetrics: {
              type: 'object',
              title: 'KubeStateMetrics service account config',
              properties: {
                create: {
                  type: 'boolean',
                  default: false,
                  title: 'Create ServiceAccount for KubeStateMetrics service',
                },
              },
            },
            nodeExporter: {
              type: 'object',
              title: 'NodeExporter service account config',
              properties: {
                create: {
                  type: 'boolean',
                  default: false,
                  title: 'Create ServiceAccount for NodeExporter service',
                },
              },
            },
            pushgateway: {
              type: 'object',
              title: 'PushGateway service account config',
              properties: {
                create: {
                  type: 'boolean',
                  default: false,
                  title: 'Create ServiceAccount for PushGateway service',
                },
              },
            },
            server: {
              type: 'object',
              title: 'Prom server service account config',
              properties: {
                create: {
                  type: 'boolean',
                  default: false,
                  title: 'Create ServiceAccount for Prometheus server',
                },
              },
            },
          },
        },
      },
    },
    jaeger: {
      type: 'object',
      title: 'Jaeger configuration',
      properties: {
        enabled: {
          type: 'boolean',
          default: false,
          title: 'Enable Jaeger tracing',
        },
        agentDNS: {
          type: 'string',
          title: 'Jaeger agentDNS',
        },
      },
    },
    service: {
      type: 'object',
      title: 'K10 K8s services config',
      properties: {
        externalPort: {
          type: 'integer',
          default: 8000,
          title: 'externalPort for K10 services',
        },
        internalPort: {
          type: 'integer',
          default: 8000,
          title: 'internalPort for K10 services',
        },
        aggregatedApiPort: {
          type: 'integer',
          default: 10250,
          title: 'aggregatedApiPort for aggapi service',
        },
        gatewayAdminPort: {
          type: 'integer',
          default: 8877,
          title: 'Gateway admin port',
        },
      },
    },
    secrets: {
      type: 'object',
      title: 'K10 secrets',
      properties: {
        awsAccessKeyId: {
          type: 'string',
        },
        awsSecretAccessKey: {
          type: 'string',
        },
        awsIamRole: {
          type: 'string',
        },
        googleApiKey: {
          type: 'string',
        },
        dockerConfig: {
          type: 'string',
        },
        dockerConfigPath: {
          type: 'string',
        },
        azureTenantId: {
          type: 'string',
        },
        azureClientId: {
          type: 'string',
        },
        azureClientSecret: {
          type: 'string',
        },
        azureResourceGroup: {
          type: 'string',
        },
        azureSubscriptionID: {
          type: 'string',
        },
        azureResourceMgrEndpoint: {
          type: 'string',
        },
        azureADEndpoint: {
          type: 'string',
        },
        azureADResourceID: {
          type: 'string',
        },
        azureCloudEnvID: {
          type: 'string',
        },
        apiTlsCrt: {
          type: 'string',
        },
        apiTlsKey: {
          type: 'string',
        },
        ibmSoftLayerApiKey: {
          type: 'string',
        },
        ibmSoftLayerApiUsername: {
          type: 'string',
        },
        vsphereEndpoint: {
          type: 'string',
        },
        vsphereUsername: {
          type: 'string',
        },
        vspherePassword: {
          type: 'string',
        },
      },
    },
    metering: {
      type: 'object',
      title: 'Metering service config',
      properties: {
        reportingKey: {
          type: 'string',
          title: 'Base64 encoded key',
        },
        consumerId: {
          type: 'string',
        },
        awsRegion: {
          type: 'string',
          title: 'AWS_REGION for metering service',
        },
        awsMarketPlaceIamRole: {
          type: 'string',
        },
        awsMarketplace: {
          type: 'boolean',
          default: false,
          title: 'Set AWS cloud metering license mode',
        },
        awsManagedLicense: {
          type: 'boolean',
          default: false,
          title: 'Set AWS managed license mode',
        },
        licenseConfigSecretName: {
          type: 'string',
          title: 'AWS managed license config secret',
        },
        serviceAccount: {
          type: 'object',
          title: 'Metering service serviceAccount config',
          properties: {
            create: {
              type: 'boolean',
            },
            name: {
              type: 'string',
            },
          },
        },
        mode: {
          type: 'string',
          title: 'Control license reporting',
          description: 'Set to `airgap` for private-network installs',
        },
        redhatMarketplacePayg: {
          type: 'boolean',
          default: false,
          title: 'Set Red Hat cloud metering license mode',
        },
        reportCollectionPeriod: {
          type: 'integer',
          default: 1800,
          title: 'Metric report collection period (in seconds)',
        },
        reportPushPeriod: {
          type: 'integer',
          default: 3600,
          title: 'Metric report push period (in seconds)',
        },
        promoID: {
          type: 'string',
          title: 'K10 promotion ID from marketing campaigns',
        },
      },
    },
    clusterName: {
      type: 'string',
      title: 'Cluster name for better logs visibility',
    },
    executorReplicas: {
      type: 'integer',
      default: 3,
      title: 'Number of executor service pod replicas for better performance',
    },
    logLevel: {
      type: 'string',
      default: 'info',
    },
    externalGateway: {
      type: 'object',
      title: 'external gateway for K10 API services',
      properties: {
        create: {
          type: 'boolean',
          default: false,
        },
        annotations: {
          type: 'object',
          title: 'The annotations Schema',
        },
        fqdn: {
          type: 'object',
          title: 'Host and domain name for the K10 API server',
          properties: {
            name: {
              type: 'string',
              title: 'Domain name for the K10 API services',
            },
            type: {
              type: 'string',
              title: 'Supported gateway type: route53-mapper or external-dns',
            },
          },
        },
        awsSSLCertARN: {
          type: 'string',
          title: 'ARN for the AWS ACM SSL certificate used in the K10 API server',
        },
      },
    },
    auth: {
      type: 'object',
      title: 'K10 dashboard authentication config',
      properties: {
        groupAllowList: {
          type: 'array',
          items: {
            type: 'string',
          },
          title: "A list of groups whose members are allowed access to K10's dashboard",
          examples: [['group1', 'group2']],
        },
        basicAuth: {
          type: 'object',
          title: 'Basic authentication for the K10 dashboard',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
            secretName: {
              type: 'string',
              title: 'Name of an existing Secret that contains a file generated with htpasswd',
            },
            htpasswd: {
              type: 'string',
              title: 'A username and password pair separated by a colon character',
            },
          },
        },
        tokenAuth: {
          type: 'object',
          title: 'Configuration for Token based authentication for the K10 dashboard',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
          },
        },
        oidcAuth: {
          type: 'object',
          default: {},
          title: 'Configuration for Open ID Connect based authentication for the K10 dashboard',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
            providerURL: {
              type: 'string',
              title: 'URL for the OIDC Provider',
            },
            redirectURL: {
              type: 'string',
              title: 'URL to the K10 gateway service',
            },
            scopes: {
              type: 'string',
              title: 'Space separated OIDC scopes required for userinfo',
              examples: ['profile email'],
            },
            prompt: {
              type: 'string',
              title: 'The type of prompt to be used during authentication',
              default: 'select_account',
              enum: ['none', 'consent', 'login', 'select_account'],
            },
            clientID: {
              type: 'string',
              title: 'Client ID given by the OIDC provider',
            },
            clientSecret: {
              type: 'string',
              title: 'Client secret given by the OIDC provider',
            },
            usernameClaim: {
              type: 'string',
              title: 'The claim to be used as the username',
            },
            usernamePrefix: {
              type: 'string',
              title:
                'Prefix that has to be used with the username obtained from the username claim',
            },
            groupClaim: {
              type: 'string',
              title: 'Name of a custom OpenID Connect claim for specifying user groups',
            },
            groupPrefix: {
              type: 'string',
              title: 'All groups will be prefixed with this value to prevent conflicts',
            },
            logoutURL: {
              type: 'string',
              title: "URL to your OIDC provider's logout endpoint",
            },
            secretName: {
              type: 'string',
              title: 'OIDC config based existing secret',
              description:
                'Must include providerURL, redirectURL, scopes, clientID/secret and logoutURL',
            },
          },
        },
        dex: {
          type: 'object',
          title: 'Dex based authentication config',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
            providerURL: {
              type: 'string',
            },
            redirectURL: {
              type: 'string',
            },
          },
        },
        openshift: {
          type: 'object',
          title: 'OpenShift OAuth server based authentication for K10 dashboard',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
            serviceAccount: {
              type: 'string',
              title: 'Name of the service account that represents an OAuth client',
            },
            clientSecret: {
              type: 'string',
              title: 'The token corresponding to the service account',
            },
            dashboardURL: {
              type: 'string',
              title: "The URL used for accessing K10's dashboard",
            },
            openshiftURL: {
              type: 'string',
              title: "The URL for accessing OpenShift's API server",
            },
            insecureCA: {
              type: 'boolean',
              default: false,
              title: 'To turn off SSL verification of connections to OpenShift',
            },
            useServiceAccountCA: {
              type: 'boolean',
              default: false,
              title: 'use the CA certificate corresponding to the Service Account',
              description:
                'Usually found at ``/var/run/secrets/kubernetes.io/serviceaccount/ca.crt``',
            },
            secretName: {
              type: 'string',
              title: 'The Kubernetes Secret that contains OIDC settings',
            },
            usernameClaim: {
              type: 'string',
              default: 'email',
              title: 'The claim to be used as the username',
            },
            usernamePrefix: {
              type: 'string',
              title:
                'Prefix that has to be used with the username obtained from the username claim',
            },
            groupnameClaim: {
              type: 'string',
              default: 'groups',
              title: 'Name of a custom OpenID Connect claim for specifying user groups',
            },
            groupnamePrefix: {
              type: 'string',
              default: '',
              title: 'The groupnamePrefix Schema',
            },
          },
        },
        ldap: {
          type: 'object',
          title: 'Active Directory/LDAP based authentication for the K10 dashboard',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
            restartPod: {
              type: 'boolean',
              default: false,
              title:
                'force a restart of the authentication service pod (useful when updating authentication config',
            },
            dashboardURL: {
              type: 'string',
              title: "The URL used for accessing K10's dashboard",
            },
            host: {
              type: 'string',
              title: 'Host and optional port of the AD/LDAP server in the form `host:port`',
            },
            insecureNoSSL: {
              type: 'boolean',
              default: false,
              title: 'Set if the AD/LDAP host is not using TLS',
            },
            insecureSkipVerifySSL: {
              type: 'boolean',
              default: false,
              title: 'Turn off SSL verification of connections to the AD/LDAP host',
            },
            startTLS: {
              type: 'boolean',
              default: false,
              title: 'TLS protocol',
              description:
                'When set to true, ldap:// is used to connect to the server followed by creation of a TLS session. When set to false, ldaps:// is used.',
            },
            bindDN: {
              type: 'string',
              default: '',
              title: 'The Distinguished Name(username) used for connecting to the AD/LDAP host',
            },
            bindPW: {
              type: 'string',
              title:
                'The password corresponding to the `bindDN` for connecting to the AD/LDAP host',
            },
            bindPWSecretName: {
              type: 'string',
              title:
                'Secret name containing the password corresponding to the `bindDN` for connecting to the AD/LDAP host',
            },
            userSearch: {
              type: 'object',
              title: 'AD/LDAP user search config',
              properties: {
                baseDN: {
                  type: 'string',
                  title: 'The base Distinguished Name to start the AD/LDAP search from',
                },
                filter: {
                  type: 'string',
                  title: 'Optional filter to apply when searching the directory',
                },
                username: {
                  type: 'string',
                  title: 'Attribute used for comparing user entries when searching the directory',
                },
                idAttr: {
                  type: 'string',
                  title:
                    "AD/LDAP attribute in a user's entry that should map to the user ID field in a token",
                },
                emailAttr: {
                  type: 'string',
                  title:
                    "AD/LDAP attribute in a user's entry that should map to the email field in a token",
                },
                nameAttr: {
                  type: 'string',
                  title:
                    "AD/LDAP attribute in a user's entry that should map to the name field in a token",
                },
                preferredUsernameAttr: {
                  type: 'string',
                  title:
                    "AD/LDAP attribute in a user's entry that should map to the preferred_username field in a token",
                },
              },
            },
            groupSearch: {
              type: 'object',
              title: 'AD/LDAP group search config',
              properties: {
                baseDN: {
                  type: 'string',
                  title: 'The base Distinguished Name to start the AD/LDAP group search from',
                },
                filter: {
                  type: 'string',
                  title: 'filter to apply when searching the directory for groups',
                },
                userMatchers: {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      userAttr: {
                        type: 'string',
                        title:
                          "Attribute in the user's entry that must match with the groupAttr while searching for groups",
                      },
                      groupAttr: {
                        type: 'string',
                        title:
                          "Attribute in the group's entry that must match with the userAttr while searching for groups",
                      },
                    },
                  },
                  title: 'List of field pairs that are used to match a user to a group',
                },
                nameAttr: {
                  type: 'string',
                  title: "The AD/LDAP attribute that represents a group's name in the directory",
                },
              },
            },
            secretName: {
              type: 'string',
              title: 'The Kubernetes Secret that contains OIDC settings',
            },
            usernameClaim: {
              type: 'string',
              title: 'The claim to be used as the username',
            },
            usernamePrefix: {
              type: 'string',
              title:
                'Prefix that has to be used with the username obtained from the username claim',
            },
            groupnameClaim: {
              type: 'string',
              default: 'groups',
              title: 'Name of a custom OpenID Connect claim for specifying user groups',
            },
            groupnamePrefix: {
              type: 'string',
              default: '',
              title: 'Prefix for user group name',
            },
          },
        },
        k10AdminUsers: {
          type: 'array',
          items: {
            type: 'string',
          },
          default: [],
          title: "A list of users who are granted admin level access to K10's dashboard",
        },
        k10AdminGroups: {
          type: 'array',
          items: {
            type: 'string',
          },
          default: [],
          title: "A list of groups whose members are granted admin level access to K10's dashboard",
        },
      },
    },
    optionalColocatedServices: {
      type: 'object',
      title: 'Optional Colocated services config',
      properties: {
        vbrintegrationapi: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
          },
        },
        garbagecollector: {
          type: 'object',
          properties: {
            enabled: {
              type: 'boolean',
              default: false,
            },
          },
        },
      },
    },
    cacertconfigmap: {
      type: 'object',
      title: 'ConfigMap containing a certificate for a trusted root certificate authority',
      properties: {
        name: {
          type: 'string',
        },
      },
    },
    apiservices: {
      type: 'object',
      title: 'If APIService objects already exists',
      properties: {
        deployed: {
          type: 'boolean',
          default: true,
        },
      },
    },
    injectKanisterSidecar: {
      type: 'object',
      title: 'Kanister sidecar injection for workload pods',
      properties: {
        enabled: {
          type: 'boolean',
          default: false,
        },
        namespaceSelector: {
          type: 'object',
          title: 'namespaceSelector config',
          properties: {
            matchLabels: {
              type: 'object',
              title:
                'Set of labels to select namespaces in which sidecar injection is enabled for workloads',
            },
          },
        },
        objectSelector: {
          type: 'object',
          title: 'objectSelector config',
          properties: {
            matchLabels: {
              type: 'object',
              title: 'Set of labels to filter workload objects in which the sidecar is injected',
            },
          },
        },
        webhookServer: {
          type: 'object',
          title: 'Sidecar injector webhook server config',
          properties: {
            port: {
              type: 'integer',
              default: 8080,
              title: 'Port number on which the mutating webhook server accepts request',
            },
          },
        },
      },
    },
    kanisterPodCustomLabels: {
      type: 'string',
      title: 'Kanister pod custom labels',
    },
    kanisterPodCustomAnnotations: {
      type: 'string',
      title: 'Kanister pod custom annotations',
    },
    genericVolumeSnapshot: {
      type: 'object',
      title: 'Generic Volume Snapshot restore pods config',
      properties: {
        resources: {
          type: 'object',
          properties: {
            requests: {
              type: 'object',
              properties: {
                memory: {
                  type: 'string',
                  title: 'Generic Volume Snapshot restore pods memory request',
                  examples: ['1Gi'],
                },
                cpu: {
                  type: 'string',
                  title: 'Generic Volume Snapshot restore pods cpu request',
                  examples: ['1'],
                },
              },
            },
            limits: {
              type: 'object',
              properties: {
                memory: {
                  type: 'string',
                  title: 'Generic Volume Snapshot restore pods memory limit',
                  examples: ['1Gi'],
                },
                cpu: {
                  type: 'string',
                  title: 'Generic Volume Snapshot restore pods cpu limit',
                  examples: ['1'],
                },
              },
            },
          },
        },
      },
    },
    garbagecollector: {
      type: 'object',
      title: 'garbage collection config',
      properties: {
        daemonPeriod: {
          type: 'integer',
          default: 1800,
          title: 'daemonPeriod in sec',
        },
        keepMaxActions: {
          type: 'integer',
          default: 1000,
        },
      },
    },
    resources: {
      type: 'object',
      title: 'K10 pods resource config',
    },
    services: {
      type: 'object',
      title: 'K10 services config',
      properties: {
        executor: {
          type: 'object',
          title: 'executor service config',
          properties: {
            hostNetwork: {
              type: 'boolean',
              default: false,
              title: 'Whether the executor pods may use the node network',
            },
            workerCount: {
              type: 'integer',
              default: 8,
              title: 'Count of running executor workers',
            },
          },
        },
        dashboardbff: {
          type: 'object',
          title: 'dashboardbff service config',
          properties: {
            hostNetwork: {
              type: 'boolean',
              default: false,
              title: 'Whether the dashboardbff pods may use the node network',
            },
          },
        },
        securityContext: {
          type: 'object',
          title: 'Custom securityContext for K10 service containers',
          properties: {
            runAsUser: {
              type: 'integer',
              default: 1000,
              title: 'User ID K10 service containers run as',
            },
            fsGroup: {
              type: 'integer',
              default: 1000,
              title: 'FSGroup that owns K10 service container volumes',
            },
          },
        },
        aggregatedapis: {
          type: 'object',
          title: 'K10 aggregatedapis service config',
          properties: {
            hostNetwork: {
              type: 'boolean',
              default: false,
              title: 'Whether the aggregatedapis pods may use the node network',
            },
          },
        },
      },
    },
    apigateway: {
      type: 'object',
      title: 'APIGateway config',
      properties: {
        serviceResolver: {
          type: 'string',
          default: 'dns',
          title: 'The resolver used for service discovery in the API gateway',
          enum: ['dns', 'endpoint'],
        },
      },
    },
    limiter: {
      type: 'object',
      title: 'Limiter configuration',
      properties: {
        genericVolumeSnapshots: {
          type: 'integer',
          default: 10,
          title: 'Limit of concurrent generic volume snapshot create operations',
        },
        genericVolumeCopies: {
          type: 'integer',
          default: 10,
          title: 'Limit of concurrent generic volume snapshot copy operations',
        },
        genericVolumeRestores: {
          type: 'integer',
          default: 10,
          title: 'Limit of concurrent generic volume snapshot restore operations',
        },
        csiSnapshots: {
          type: 'integer',
          default: 10,
          title: 'Limit of concurrent CSI snapshot create operations',
        },
        providerSnapshots: {
          type: 'integer',
          default: 10,
          title: 'Limit of concurrent cloud provider create operations',
        },
      },
    },
    gateway: {
      type: 'object',
      title: 'Gateway config',
      properties: {
        insecureDisableSSLVerify: {
          type: 'boolean',
          default: false,
          title: 'Whether to disable SSL verification for gateway pods',
        },
        exposeAdminPort: {
          type: 'boolean',
          default: true,
          title: 'Whether to expose Admin port for gateway service',
        },
      },
    },
    kanister: {
      type: 'object',
      title: 'The kanister Schema',
      properties: {
        backupTimeout: {
          type: 'integer',
          default: 45,
          title: 'Timeout on Kanister backup operations in mins',
        },
        restoreTimeout: {
          type: 'integer',
          default: 600,
          title: 'Timeout for Kanister restore operations in mins',
        },
        deleteTimeout: {
          type: 'integer',
          default: 45,
          title: 'timeout for Kanister delete operations in mins',
        },
        hookTimeout: {
          type: 'integer',
          default: 20,
          title: 'Timeout for Kanister pre-hook and post-hook operations',
        },
        checkRepoTimeout: {
          type: 'integer',
          default: 20,
          title: 'Timeout for Kanister checkRepo operations',
        },
        statsTimeout: {
          type: 'integer',
          default: 20,
          title: 'Timeout for Kanister stats operations',
        },
        efsPostRestoreTimeout: {
          type: 'integer',
          default: 45,
          title: 'Timeout for Kanister efsPostRestore operations',
        },
        podReadyWaitTimeout: {
          type: 'integer',
          default: 15,
          title: 'Timeout for Kanister tooling pods to be ready during operations',
        },
      },
    },
    awsConfig: {
      type: 'object',
      title: 'AWS config',
      properties: {
        assumeRoleDuration: {
          type: 'string',
          title: 'Duration of a session token generated by AWS for an IAM role',
          description:
            "The minimum value is 15 minutes and the maximum value is the maximum duration setting for that IAM role. For documentation about how to view and edit the maximum session duration for an IAM role see https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use.html#id_roles_use_view-role-max-session. The value accepts a number along with a single character 'm'(for minutes) or 'h' (for hours)  Examples: 60m or 2h",
        },
        efsBackupVaultName: {
          type: 'string',
          default: 'k10vault',
          title: 'the AWS EFS backup vault name',
        },
      },
    },
    grafana: {
      type: 'object',
      title: 'Grafana config',
      properties: {
        enabled: {
          type: 'boolean',
          default: true,
        },
        prometheusName: {
          type: 'string',
          default: 'prometheus-server',
        },
        prometheusPrefixURL: {
          type: 'string',
          default: '/k10/prometheus',
        },
        rbac: {
          type: 'object',
          title: 'Grafana rbac config',
          properties: {
            namespaced: {
              type: 'boolean',
              default: true,
            },
            pspEnabled: {
              type: 'boolean',
              default: false,
              title: 'Grafana Pod Security Policy config',
            },
          },
        },
      },
    },
    encryption: {
      type: 'object',
      title: 'encryption config',
      properties: {
        primaryKey: {
          type: 'object',
          title: 'primaryKey is used for enabling encryption of K10 primary key',
          properties: {
            awsCmkKeyId: {
              type: 'string',
              title: 'Ensures AWS CMK is used for encrypting K10 primary key',
            },
            vaultTransitKeyName: {
              type: 'string',
              title: 'Vault Transit Key Name',
            },
            vaultTransitPath: {
              type: 'string',
              default: '',
              title: 'Vault Transit Path',
            },
          },
        },
      },
    },
    vmWare: {
      type: 'object',
      title: 'VMWare integration config',
      properties: {
        taskTimeoutMin: {
          type: 'string',
          title: 'the timeout for VMWare operations',
        },
      },
    },
    vault: {
      type: 'object',
      title: 'Vault config',
      properties: {
        secretName: {
          type: 'string',
          title: 'Vault secret name',
        },
        address: {
          type: 'string',
          default: 'http://vault:8200',
          title: 'Vault address',
        },
      },
    },
  },
}
