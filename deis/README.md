
DEIS
====

Waziup uses DEIS to provide a Platform as a Service layer.
DEIS allows end users to 'push' their program source code, which is compiled and deployed on Kubernetes.
DEIS is itself installed inside [Kubernetes](../kubernetes/INSTALL.md).

Installation
------------

#On a local PC#
If you want to experiment with Deis, you can execute it using Vagrant.
It requires a relatively powerful PC.

Follow the instructions at http://docs.deis.io/en/latest/installing_deis/vagrant/
Then at http://docs.deis.io/en/latest/installing_deis/install-platform/#install-deis-platform
Taking care of executing the instructions in the "Note" boxes for vagrant.

#In a Cloud#
DEIs will be installed in Kubernetes.
The instructions are [here](https://deis.com/docs/workflow/installing-workflow).

After fetching the deis-workflow, you need to edit the configuration for the Swift object storage:

```
$ helmc repo add deis https://github.com/deis/charts
$ cd platform/deis
$ helmc fetch deis/workflow-v2.8.0
```

Edit the file workflow-v2.8.0/tpl/generate_params.toml to add you OpenStack password.
The complete instructions for storage are [here](https://deis.com/docs/workflow/installing-workflow/configuring-object-storage/).

```
$ cp workflow-v2.8.0/tpl/generate_params.toml ~/.helmc/workspace/charts/workflow-v2.8.0/tpl/
```

Waziup platform does not currently support external LoadBalancer (see corresponding issue on github), so you need to copy the deis-router-service from Waziup:
```
$ cp workflow-v2.8.0/manifests/deis-router-service.yaml ~/.helmc/workspace/charts/workflow-v2.8.0/manifests
```

Generate and install:
```
$ helmc generate -x manifests workflow-v2.8.0
$ helmc install workflow-v2.8.0
```

Check your deployement with:

```
kubectl get pods -n deis -w
```

Pushing an application
----------------------

Install Deis client:
```
$ curl -sSL http://deis.io/deis-cli/install-v2.sh | bash
$ sudo ln -fs $PWD/deis /usr/local/bin/deis
```

Register with the platform:
```
deis register http://deis.waziup.io
deis keys:add ~/.ssh/<your public key>
```

Download the application and associate it with deis:
```
$ git clone https://github.com/deis/example-go.git
$ cd example-go
$ deis create
```

Push the application:
```
git push waziup master
```

Troubleshooting
---------------

Removing DEIS:
```
kubectl delete ns deis
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_database'
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_registry'
swift --os-storage-url http://217.77.95.1:8080/v1/AUTH_f295bf3ecf554559a493e8df347e48de delete 'waziup_builder'
```
